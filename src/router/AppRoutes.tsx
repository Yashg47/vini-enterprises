import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Collections from "../pages/Collections";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/collections"
          element={<Collections />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}