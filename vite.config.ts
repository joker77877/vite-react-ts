import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import autoImport from 'unplugin-auto-import/vite';
import { AntDesignResolver } from './antdResolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ plugins: [['@swc/plugin-styled-components', {}]] }),
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
                    'react-router-dom': ['createBrowserRouter', 'RouterProvider'],
                    'lodash-es': ['find', 'filter', 'throttle', 'map', 'range', 'random'],
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
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
    },
    server: {
        open: true,
    },
});
