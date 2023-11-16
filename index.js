// Appel des routes
const auth = require('./routes/auth');
const steam = require('./routes/steam');

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const TOKEN = '---------------------';
const app = express();

app.use(session({ secret: TOKEN, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Ajout des headers pour CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');


  next();
});

app.use(bodyParser.json()); // Utilisation de bodyParser pour traiter les requetes JSON

// Liaisons des routes:
app.use('/auth' , auth);
app.use('/steam', steam);

// Utilisation de HTTPS
const options = {
key:fs.readFileSync('/etc/letsencrypt/live/rivandy.com-0002/privkey.pem'),
cert:fs.readFileSync('/etc/letsencrypt/live/rivandy.com-0002/fullchain.pem')
}

// Creation du serveur, ecoute sur le port 3002 (HTTPS)
const server = https.createServer(options, app);
server.listen(3002, () => {
  console.log('Serveur sur le port 3002 (HTTPS)');
});