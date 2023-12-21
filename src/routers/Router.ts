const Home = lazy(() => import('@/pages/Home/Home'));

const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
        // lazy: () => import('@/pages/Home/Home'),
    },
]);
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
