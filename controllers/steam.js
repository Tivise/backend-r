const axios = require("axios");
const API_KEY = '---------------';

exports.GetSteamUserInformation = async (req, res) => {
  const steamID = req.query.steamID;
  const response = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+ API_KEY + '&steamids=' + steamID);
  res.json(response.data.response.players[0]); // Return the data from St eam API as JSON
}
