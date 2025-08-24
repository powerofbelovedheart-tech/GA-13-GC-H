import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/postCard";

export default function Home() {
  return (
    <div>
      <h1>GR-13 · Global Human Rights</h1>
      <p style={{ maxWidth: 720 }}>
        En åpen plattform for å dele, beskytte og løfte hverandre – med sannhet, teknologi og fellesskap.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginTop: 18 }}>
        <PostCard
          title="Skriv din historie"
          body="Fortell med egne ord – som dagbok, artikkel eller bokprosjekt."
          actions={<Link to="/history">Gå til Historie →</Link>}
        />
        <PostCard
          title="Rettighetsbibliotek"
          body="Kjappe svar på hverdagslige rettighetsspørsmål."
          actions={<Link to="/rights">Gå til Rettigheter →</Link>}
        />
        <PostCard
          title="Del og oppdag"
          body="Media-innlegg fra fellesskapet – tekst, bilde og video."
          actions={<Link to="/media">Gå til Media →</Link>}
        />
        <PostCard
          title="Kjøp & salg"
          body="Tryggere lokale annonser. Velg kortbetaling (Stripe) for ekstra sikkerhet."
          actions={<Link to="/market">Gå til Torget →</Link>}
        />
      </div>
    </div>
  );
}