/* eslint-disable */
import { CallExpression, MemberExpression, Token } from "@typescript-eslint/types/dist/generated/ast-spec";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = 'wrap-multiline-expression'
export type MessageIds = 'wrapMultilineExpression'
export type Options = []

export const wrapMultilineExpression = createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Enforce parentheses around multiline expressions',
      recommended: 'error',
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
    messages: {
      wrapMultilineExpression: 'Wrap multiline expression in parentheses',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      [`
        :matches(
          :matches(CallExpression, MemberExpression):not(:matches(CallExpression, MemberExpression) > :expression),
          :matches(CallExpression, MemberExpression).arguments
        )
        `.replace(/\s/g, '')
      ](node: CallExpression | MemberExpression) {
        if (node.type === 'CallExpression' && (
          node.callee.type !== 'MemberExpression'
          || node.callee.loc.start.line === node.callee.loc.end.line
        )) {
          return;
        }

        const inCallExpressionParentheses: { start: Token | null, end: Token | null } = { start: null, end: null };

        if (node.parent?.type === 'CallExpression') {
          inCallExpressionParentheses.start = sourceCode.getTokenAfter(node.parent.callee);
          inCallExpressionParentheses.end = sourceCode.getLastToken(node.parent);
        }

        const previousToken = sourceCode.getTokenBefore(node);
        const nextToken = sourceCode.getTokenAfter(node);

        const isMultiline = node.loc.start.line !== node.loc.end.line;
        const startsWithParen = previousToken?.value === '(' && previousToken !== inCallExpressionParentheses.start;
        const endsWithParen = nextToken?.value === ')' && nextToken !== inCallExpressionParentheses.end;

        if (
          isMultiline &&
          (!startsWithParen || !endsWithParen)
        ) {
          context.report({
            node,
            messageId: 'wrapMultilineExpression',
            *fix(fixer) {
              yield fixer.replaceText(node, `(${context.getSourceCode().getText(node)})`);
            },
          });
        }
      },
    }
  },
})
