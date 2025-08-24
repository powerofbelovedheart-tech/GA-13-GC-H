import React from "react";
import PostCard from "../components/postCard";

export default function Media() {
  const demo = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Innlegg #${i + 1}`,
    body: "Kort tekst. Legg til opplastinger og beskrivelser her etter hvert.",
  }));

  return (
    <div>
      <h2>Media</h2>
      <p>Her kommer innlegg, bilder og video. (Demo-visning nå.)</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {demo.map(x => (
          <PostCard key={x.id} title={x.title} body={x.body} />
        ))}
      </div>
    </div>
  );
}