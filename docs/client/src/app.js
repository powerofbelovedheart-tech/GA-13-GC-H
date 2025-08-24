import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Media from "./pages/Media";
import Market from "./pages/Market";
import Rights from "./pages/Rights";
import History from "./pages/History";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "2rem 1rem", maxWidth: 1100, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
          <Route path="/market" element={<Market />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}