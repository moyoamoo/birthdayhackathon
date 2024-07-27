import React from "react";
import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import RecommendedProducts from "./components/RecommendedProducts";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/products" element={<RecommendedProducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}
