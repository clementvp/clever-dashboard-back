require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./routes/api.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./dist'));

app.use('/api', api);

app.use('/plugins/:name', (req, res, next) => {
  const plugin = express.static(`./plugins/${req.params.name}`);
  plugin(req, res, next);
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    app.listen(process.env.PORT || 3000, () => {
      console.log('Example app listening on port 3000!');
    });
  } catch (error) {
    console.log('Erreur connexion database');
  }
};

start();
