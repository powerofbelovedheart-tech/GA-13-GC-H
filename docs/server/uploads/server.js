const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adsRoutes = require("./routes/ads");
const paymentsRoutes = require("./routes/payments");

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get("/api/health", (_, res) => res.json({ ok: true }));

// API-ruter
app.use("/api/auth", authRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/payments", paymentsRoutes);

// (Valgfritt) servér frontend fra /client/dist hvis du bygger Vite
// const clientDist = path.join(__dirname, "..", "client", "dist");
// app.use(express.static(clientDist));
// app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server kjører på http://localhost:${PORT}`));