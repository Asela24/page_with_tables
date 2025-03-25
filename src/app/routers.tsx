import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner.tsx";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const TablePage = lazy(() => import("../pages/TablePage"));
const LayoutPage = lazy(() => import("../pages/LayoutPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LayoutPage />
      </Suspense>
    ),
    children: [
      {
        path: "/auth",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/table",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TablePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
], {
  basename: '/page_with_tables/',
});
