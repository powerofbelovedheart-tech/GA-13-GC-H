import React from "react";

export default function PostCard({ title, body, image, actions }) {
  return (
    <article
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {image ? (
        <img alt={title} src={image} style={{ objectFit: "cover", width: "100%", height: 180 }} />
      ) : (
        <div style={{ height: 180, background: "linear-gradient(135deg, #d9e7ff, #f1f5ff)" }} />
      )}
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        {body && <p style={{ marginTop: 8, color: "#444" }}>{body}</p>}
      </div>
      {actions && <div style={{ padding: 12, display: "flex", gap: 8 }}>{actions}</div>}
    </article>
  );
}