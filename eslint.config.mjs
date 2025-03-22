// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt({
  plugins: { prettier },
  rules: {
    ...prettierConfig.rules,
    'prettier/prettier': 'error',
  },
})
