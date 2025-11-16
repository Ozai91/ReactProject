import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Mac from "./page/Mac";
import About from "./page/About";
import Contact from "./page/Contact";
import Footer from "./components/Footer";
import IPadPage from "./page/iPad";
import IPhonePage from "./page/iPhone";
import Watch from "./page/Watch";
import AddProduct from "./components/AddProduct";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/ipad" element={<IPadPage />} />
          <Route path="/iphone" element={<IPhonePage />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </CartProvider>
  );
};

export default App;
