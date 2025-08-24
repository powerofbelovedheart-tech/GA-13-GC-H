import React from "react";
import PostCard from "../components/postCard";

export default function Market() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/ads")
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const startCheckout = async (amountNOK) => {
    try {
      const r = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        body: JSON.stringify({ amount: amountNOK, currency: "nok" }),
      });
      const data = await r.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Fikk ikke startet betaling.");
    } catch (e) {
      alert("Betaling feilet.");
    }
  };

  return (
    <div>
      <h2>Kjøp & salg</h2>
      <p>Demo-annonser fra API. Legg til ekte CRUD etter hvert.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {items.map((x) => (
          <PostCard
            key={x.id}
            title={`${x.title} — ${x.price} NOK`}
            body={x.desc}
            actions={
              <button onClick={() => startCheckout(x.price)} style={{ padding: "8px 12px", borderRadius: 8 }}>
                Betal med kort
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}