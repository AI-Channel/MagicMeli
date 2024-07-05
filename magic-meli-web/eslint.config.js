import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2025, ...globals.node },
      ecmaVersion: 'latest',
      parserOptions: { parser: tseslint.parser }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  pluginPrettierRecommendedConfigs
]
