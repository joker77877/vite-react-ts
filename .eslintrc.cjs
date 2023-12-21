module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        // 'plugin:react/recommended',
        // 'plugin:react-hooks/recommended',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:import/recommended',
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/extensions': [
            'error',
            {
                ignorePackages: true,
                pattern: {
                    js: 'always',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                    scss: 'never',
                    json: 'always',
                    png: 'always',
                    jpg: 'always',
                    svg: 'always',
                },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.ts'] }],
        'import/no-unresolved': [
            2,
            {
                ignore: ['^@/', '^/'], // @ 是设置的路径别名
            },
        ],
        'react/jsx-no-undef': ['off', { allowGlobals: true }],
    },

    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.svg'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            alias: {
                map: [
                    ['/@', './src'],
                    ['/', './public'],
                ],
                extensions: ['.ts', '.js', '.jsx', '.json', '.scss', '.tsx'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: 'React', // Pragma to use, default to "React"
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
            flowVersion: '0.53', // Flow version
        },
    },
};
