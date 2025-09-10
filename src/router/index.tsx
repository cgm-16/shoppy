import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { TimeDeal, BrandDeal, NotFound } from "@/pages";
import { Suspense, type ReactNode } from "react";

export const webPath = {
  timeDeal: () => "/time-deal",
  brandDeal: () => "/brand-deal"
};

type MainLayoutProps = { children: ReactNode };

function MainLayout({ children }: MainLayoutProps) {
  return children;
}

const Root = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div>
            로딩중
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </MainLayout>
  );
};

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Navigate to={webPath.timeDeal()} replace /> },
      { path: webPath.timeDeal(), element: <TimeDeal /> },
      { path: webPath.brandDeal(), element: <BrandDeal /> },
      { path: "*", element: <NotFound /> }
    ],
  },
];

export const router = createBrowserRouter(routes);
