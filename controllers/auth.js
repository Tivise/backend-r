const axios = require("axios");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const API_KEY = '****************';
const SteamStrategy = require('passport-steam').Strategy;
const TOKEN = '***************************';

passport.use(
  new SteamStrategy({
    returnURL: 'https://www.rivandy.com/auth/steam/return', // URL de redirection après l'authentification
    realm: 'https://www.rivandy.com/', // URL de l'application
    apiKey: API_KEY // Clé API Steam
  },
  function(identifier, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((obj, done) => {
done(null, obj);
});


exports.OnConnectSteam = passport.authenticate('steam', { failureRedirect: '/' }),(req, res) => {
    res.redirect('/');
  }


exports.ReturnAfterSteam = (req, res, next) => {
  req.url = req.originalUrl;
  next();
}


exports.ValidateSteam = async (req, res) => {
  const verificationUrl = req.query.verificationUrl;
  const steamID = req.query.steamID;
  const response = await axios.get(verificationUrl, passport.authenticate('steam'));
  const isValid = response.data.trim().slice(-4) === 'true';

  if(isValid){
    const response = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+ API_KEY + '&steamids=' + steamID);
    
    const token = jwt.sign(
      { steamID: response.data.response.players[0].steamid },
      TOKEN,
      { noTimestamp: true, expiresIn: '1h'}
    );

    const data = {
      ...response.data.response.players[0],
      token
    }
    
    res.json(data);
  }
}