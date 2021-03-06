require('dotenv').config();
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const api = require('./routes/api.js');

const app = express();
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKURI,
  }),
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
});

app.use(cors());
app.use(express.json());

app.use('/api', checkJwt, api);

app.use('/plugins/:name', (req, res, next) => {
  if (fs.existsSync(`./plugins/${req.params.name}/index.html`)) {
    const plugin = express.static(`./plugins/${req.params.name}`);
    plugin(req, res, next);
  } else {
    res.status(500).json({ error: true, msg: 'KO', error_msg: 'This plugin does not exist' });
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    app.listen(process.env.PORT || 3000, () => {
      console.info('Server is listening on port 3000!');
    });
  } catch (error) {
    console.warn('Erreur database connexion');
  }
};

start();
