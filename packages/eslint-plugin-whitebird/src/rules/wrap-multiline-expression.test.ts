/* eslint-disable */
import { ruleTester } from "../utils/rule-tester";
import { it } from 'vitest'
import { wrapMultilineExpression, RULE_NAME } from "./wrap-multiline-expression";

it('runs', () => {
  ruleTester.run(RULE_NAME, wrapMultilineExpression, {
    valid: [
      {
        code: `
        const file_name = (component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase())
        `,
      },
      {
        code: `
        (component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase())
        `,
      },
      {
        code: `
        const file_name = (
          component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()
        )
        `,
      },
      {
        code: `
        const file_name = (
          component
            .name
            .length
        )
        `,
      },
      {
        code: `
        doSomething(
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        )
        `,
      },
      {
        code: `
        Some.thing(
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        )
        `,
      },
      {
        code: `
        const obj = {
          name: (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        }
        `,
      },
      {
        code: `
        const arr = [
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        ]
        `,
      },
    ],
    invalid: [
      {
        code: `
        const file_name = component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase()
        `,
        output: `
        const file_name = (component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase())
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
      {
        code: `
        component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase()
        `,
        output: `
        (component
          .name
          .replace(/([09a-z–])([A-Z])/g, '$1-$2')
          .toLowerCase())
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
      {
        code: `
        const obj = {
          name: component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()
        }
        `,
        output: `
        const obj = {
          name: (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        }
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
      {
        code: `
        const arr = [
          component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()
        ]
        `,
        output: `
        const arr = [
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        ]
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
      {
        code: `
        doSomething(
          component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()
        )
        `,
        output: `
        doSomething(
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        )
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
      {
        code: `
        doSomething(
          component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase(),
          component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()
        )
        `,
        output: `
        doSomething(
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase()),
          (component
            .name
            .replace(/([09a-z–])([A-Z])/g, '$1-$2')
            .toLowerCase())
        )
        `,
        errors: [
          {
            messageId: 'wrapMultilineExpression',
          },
          {
            messageId: 'wrapMultilineExpression',
          },
        ],
      },
    ],
  })
});
