// import Layout from '@/pages/Layout/Layout';
import { wrapCreateBrowserRouter } from '@sentry/react';
// const Home = lazy(() => import('@/pages/Home/Home'));
// const Layout = lazy(() => import('@/pages/Layout/Layout'));

const sentryCreateBrowserRouter = wrapCreateBrowserRouter(createBrowserRouter);
const router = sentryCreateBrowserRouter([
    {
        path: '/',
        Component: lazy(() => import('@/pages/Layout/Layout')),
        children: [{ path: 'home', Component: lazy(() => import('@/pages/Home/Home')) }],
        // async lazy() {
        //     let Home = (await import('@/pages/Home/Home')).default;
        //     return { Component: Home };
        // },
    },
]);
// let router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<Layout />}>
//             <Route path="home" lazy={() => import('../pages/Home/Home')} />
//         </Route>,
//     ),
// );
// const routeMap: Record<string, string> = {};
// const renderRoute = (routerList?: typeof routers) => {
//     return routerList?.map(({ path, element, children, breadcrumbName }) => {
//         routeMap[path] = breadcrumbName;
//         const Element = element;
//         return (
//             <Route
//                 path={path}
//                 key={path}
//                 element={
//                     <Suspense fallback={<Loading />}>
//                         <Element />
//                     </Suspense>
//                 }
//             >
//                 {renderRoute(children)}
//             </Route>
//         );
//     });
// };

// const RouterRoot = () => {
//     return (
//         <HistoryRouter history={history}>
//             <Routes>{renderRoute(routers)}</Routes>
//         </HistoryRouter>
//     );
// };
// export { routeMap };

export default router;
