'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./application/routes/apiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date(), servicio: 'Hospital Backend' });
});

app.use((req, res) => {
  res.status(404).json({ message: `Ruta ${req.method} ${req.path} no existe.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;