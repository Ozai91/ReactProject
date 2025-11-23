import React from "react";
import "./font/kamerik.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Mac from "./page/Mac";
import About from "./page/About";
import Contact from "./page/Contact";
import Footer from "./components/Footer";
import IPadPage from "./page/iPad";
import IPhonePage from "./page/iPhone";
import OrderReport from "./page/OrderReport";
import Admin from "./page/Admin";
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
          <Route path="/about" element={<About />} />
          <Route path="/order-report" element={<OrderReport />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </CartProvider>
  );
};

export default App;
