const express = require('express');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');



const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Ruta protegida
app.get('/api/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(' ')[1]; // extrae solo el token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: "Ruta protegida", user });
  });
});


app.listen(3000, () => console.log('App corriendo en puerto 3000'));
