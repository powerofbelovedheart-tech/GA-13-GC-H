import React from "react";
import { Link, useLocation } from "react-router-dom";

const Item = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "8px 14px",
        borderRadius: 12,
        background: active ? "rgba(0,0,0,0.08)" : "transparent",
        color: "#111",
        fontWeight: 600
      }}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid #e5e5e5", backdropFilter: "blur(12px)" }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 12px"
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#111", fontSize: 20, fontWeight: 800 }}>
          GA-13
        </Link>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Item to="/">Hjem</Item>
          <Item to="/media">Media</Item>
          <Item to="/rights">Rettigheter</Item>
          <Item to="/history">Historie</Item>
          <Item to="/market">Kjøp & salg</Item>
        </div>
      </nav>
    </header>
  );
}