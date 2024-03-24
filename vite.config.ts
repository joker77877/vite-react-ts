import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import autoImport from 'unplugin-auto-import/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { AntDesignResolver } from './antdResolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ plugins: [['@swc/plugin-styled-components', {}]] }),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
        }),
        sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,

            // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
            authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
        autoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            ],
            imports: [
                // presets
                'react',
                'react-router-dom',
                'react-i18next',
                {
                    react: ['createContext', 'Suspense', 'createElement'],
                    'react-i18next': ['Translation'],
                    'react-query': ['useQuery', 'useMutation', 'QueryClient', 'QueryClientProvider'],
                    'react-router-dom': ['createBrowserRouter', 'RouterProvider', 'createRoutesFromElements'],
                    'lodash-es': ['find', 'filter', 'throttle', 'map', 'range', 'random', 'cloneDeep'],
                    recoil: ['atom', 'selector', 'useRecoilState', 'useRecoilValue', 'RecoilRoot', 'useSetRecoilState'],
                },
            ],
            dts: true,
            dirs: [
                './src/components',
                './src/hooks',
                './src/store',
                './src/constants',
                './src/utils',
                './src/types',
                './src/services',
                './src/pages',
            ],
            resolvers: [AntDesignResolver({ resolveIcons: true, importStyle: 'less' })],
        }),
        visualizer(),
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
    },
    server: {
        open: true,
    },
});
