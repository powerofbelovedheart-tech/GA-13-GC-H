import React from "react";
export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e5e5e5", marginTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 12px", fontSize: 14, color: "#555" }}>
        © {new Date().getFullYear()} GA-13 · Global Community & Human Rights
      </div>
    </footer>
  );
}