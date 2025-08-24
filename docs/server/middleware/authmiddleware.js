const jwt = require("jsonwebtoken");
const { getUserById } = require("../utils/db");

function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Mangler token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    const user = getUserById(decoded.sub);
    if (!user) return res.status(401).json({ error: "Ugyldig bruker" });

    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch {
    return res.status(401).json({ error: "Ugyldig token" });
  }
}

module.exports = { authMiddleware };