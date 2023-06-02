import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      

      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:category",
          element: <Catalog />,
        },
        {
          path: "/:category/search/:keyword",
          element: <Catalog />,
        },
        {
          path: "/:category/:id",
          element: <Detail />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
