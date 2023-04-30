import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'

export const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
})
