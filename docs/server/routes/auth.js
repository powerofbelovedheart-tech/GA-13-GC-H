const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../utils/db");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = Router();

/** POST /api/auth/register {name,email,password} */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: "Mangler felter" });

    if (getUserByEmail(email)) return res.status(409).json({ error: "Bruker finnes" });

    const hash = await bcrypt.hash(password, 10);
    const user = createUser({ name, email, passwordHash: hash });

    const token = jwt.sign({ sub: user.id, email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name, email } });
  } catch (e) {
    res.status(500).json({ error: "Feil ved registrering" });
  }
});

/** POST /api/auth/login {email,password} */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Feil e-post/passord" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Feil e-post/passord" });

    const token = jwt.sign({ sub: user.id, email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (e) {
    res.status(500).json({ error: "Feil ved innlogging" });
  }
});

/** GET /api/auth/me */
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;