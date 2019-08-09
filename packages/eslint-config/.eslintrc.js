module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
        sourceType:  'module',  // Allows for the use of imports
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'prettier',
        // 'plugin:prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules:  {
        "no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_$|^_unused_",
                varsIgnorePattern: "^_$|^_unused_",
                caughtErrorsIgnorePattern: "^_$|^_unused_",
            },
        ],
        "no-use-before-define": ["off"],
        "no-useless-constructor": ["off"],
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowTypedFunctionExpressions": true
        }],
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4],

    }
};
