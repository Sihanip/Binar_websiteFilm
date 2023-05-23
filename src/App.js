import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// BrowserRouter, Routes, Route,
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// import Routing from "./config/Routing";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";

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
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    //       <Header />
    //     <Footer />
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route>
    //           <Header  />
    //           <Routing />
    //           <Footer />
    //       </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
