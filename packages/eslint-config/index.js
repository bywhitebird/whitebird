/* eslint-disable */

import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()

function getPackageJson() {
  const packageJsonPath = path.join(cwd, 'package.json')
  const packageJson = fs.readFileSync(packageJsonPath, 'utf8')
  return JSON.parse(packageJson)
}

const packageJson = getPackageJson()
const workspacePackages = /** @type {string[]} */ (packageJson['workspaces']) || [cwd]

const variableNamingConvention = [
  {
    selector: 'variable',
    modifiers: ['const'],
    format: ['UPPER_CASE', 'snake_case'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: 'variable',
    format: ['snake_case'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: ['function', 'variable'],
    types: ['function'],
    format: ['camelCase'],
    leadingUnderscore: 'allow',
    trailingUnderscore: 'forbid',
  },
  {
    selector: ['typeLike', 'interface'],
    format: ['PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
    custom: {
      regex: '^I[A-Z]',
      match: false,
    },
  },
]

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsdoc',
    'es',
    'unicorn',
    'functional',
    'fp',
    'promise',
    'whitebird',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended-error',
    'plugin:functional/recommended',
    'plugin:functional/no-other-paradigms',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard'
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'semi': ['error', 'never'],
    'max-len': ['error', { code: 80 }],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'complexity': ['error', 20],
    'max-params': ['error', 3],
    'max-depth': ['error', 3],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-style': ['error', 'last'],
    'comma-spacing': ['error', { before: false, after: true }],
    'semi-style': ['error', 'first'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'function-call-argument-newline': ['error', 'consistent'],
    'max-lines': ['error', 400],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-return-await': 'error',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme'],
        location: 'anywhere',
      },
    ],

    'whitebird/wrap-multiline-expression': 'error',

    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown',
        ],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',

    'jsdoc/require-jsdoc': [
      'error',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      },
    ],

    'es/no-destructuring': 'error',
    'es/no-arrow-functions': 'error',

    'unicorn/better-regex': 'error',
    'unicorn/filename-case': [
      'error',
      {
        'case': 'kebabCase'
      }
    ],
    'unicorn/no-await-expression-member': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-negated-condition': 'error',
    'unicorn/no-nested-ternary': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/no-unnecessary-await': 'warn',
    'unicorn/no-unreadable-iife': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-useless-promise-resolve-reject': 'error',
    'unicorn/no-useless-switch-case': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-code-point': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-event-target': 'error',
    'unicorn/prefer-export-from': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-native-coercion-functions': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-prototype-methods': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-set-size': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-switch': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/prevent-abbreviations': 'error',
    'unicorn/relative-url-style': ['error', 'always'],
    'unicorn/require-array-join-separator': 'error',
    'unicorn/require-number-to-fixed-digits-argument': 'error',
    'unicorn/switch-case-braces': 'error',
    'unicorn/template-indent': 'error',
    'unicorn/text-encoding-identifier-case': 'error',
    'unicorn/throw-new-error': 'error',

    'fp/no-arguments': 'error',

    'functional/no-expression-statements': [
      'error',
      {
        ignoreVoid: true,
        ignorePattern: ['^\\bvoid\\b\\s'],
      },
    ],

    'promise/no-nesting': 'error',
    'promise/no-return-wrap': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: workspacePackages.map((folder) =>
          path.join(folder, 'tsconfig.json')
        ),
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts', '*.astro'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:jsdoc/recommended-typescript-error',
        'plugin:functional/external-typescript-recommended',
      ],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          ...variableNamingConvention,
        ],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['function', 'variable'],
            types: ['function'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
          ...variableNamingConvention,
        ],
        'functional/functional-parameters': 'off',
      },
    },
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', 2],
        'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'jsonc/no-octal-escape': 'error',
        'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': 'off',
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^exports.*$',
            order: [
              'types',
              'require',
              'import',
            ],
          },
        ],
      },
    },
  ],
}
