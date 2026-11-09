import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// A data router so <Link viewTransition> works: navigation waits for the lazy page chunk
// (and, for posts, the markdown) before the View Transition snapshots the new page.
const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            { index: true, lazy: () => import('./pages/Index').then((m) => ({ Component: m.default })) },
            { path: 'projects/all', lazy: () => import('./pages/AllProjects').then((m) => ({ Component: m.default })) },
            { path: 'blogs/all', lazy: () => import('./pages/AllBlogs').then((m) => ({ Component: m.default })) },
            {
              path: 'project/:slug',
              lazy: () => import('./pages/ProjectPage').then((m) => ({ Component: m.default, loader: m.loader })),
            },
            {
              path: 'blog/:slug',
              lazy: () => import('./pages/BlogPost').then((m) => ({ Component: m.default, loader: m.loader })),
            },
            { path: '*', element: <NotFound /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ThemeProvider>
  );
}

export default App;
