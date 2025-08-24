// Superenkel "db" i minne + fil (db.json) så data overlever restarts i Codespaces
const fs = require("fs");
const path = require("path");
const DB_FILE = path.join(__dirname, "..", "db.json");

let state = { users: [] };
try {
  if (fs.existsSync(DB_FILE)) {
    state = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  }
} catch {
  state = { users: [] };
}

function persist() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {}
}

function getUserByEmail(email) {
  return state.users.find(u => u.email === email);
}
function getUserById(id) {
  return state.users.find(u => u.id === id);
}
function createUser({ name, email, passwordHash }) {
  const user = { id: Date.now().toString(36), name, email, passwordHash, createdAt: new Date().toISOString() };
  state.users.push(user);
  persist();
  return user;
}

module.exports = { getUserByEmail, getUserById, createUser };