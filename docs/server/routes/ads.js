const { Router } = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = Router();

// enkel in-memory demo
let ADS = [
  { id: "a1", title: "Stihl MS661C Motorsag", price: 13000, desc: "Pen og velholdt." },
  { id: "a2", title: "Arc'teryx skalljakke", price: 2500, desc: "Str L, nesten ny." },
  { id: "a3", title: "Til salgs – MC dekk", price: 1200, desc: "Bra mønster." },
];

// GET /api/ads
router.get("/", (_, res) => res.json(ADS));

// POST /api/ads (krever auth)
router.post("/", authMiddleware, (req, res) => {
  const { title, price, desc } = req.body || {};
  if (!title || !price) return res.status(400).json({ error: "Mangler tittel/pris" });
  const ad = { id: Date.now().toString(36), title, price: Number(price), desc: desc || "" };
  ADS.unshift(ad);
  res.json(ad);
});

module.exports = router;