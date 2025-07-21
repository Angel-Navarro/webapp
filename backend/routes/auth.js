const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// Verifica o crea la tabla 'users' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error al crear/verificar la tabla users:', err);
  } else {
    console.log('Tabla users verificada o creada correctamente.');
  }
});

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Usuario registrado');
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Credenciales inválidas');
    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(401).send('Credenciales inválidas');
    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

module.exports = router;
