// eslint.config.js

import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  // Базовая конфигурация для всех JS файлов
  pluginJs.configs.recommended,
  stylistic.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn'],
      '@stylistic/semi': ['off'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],
    },
  },

  // === Только для тестов ===
  {
    files: ['__tests__/**'],
    languageOptions: {
      globals: {
        ...globals.jest, // ✅ Разрешаем использовать describe, test, expect и т.д.
      },
    },
  },

  // Игнорируемые файлы
  {
    ignores: ['dist/', 'node_modules/'],
  },
]
