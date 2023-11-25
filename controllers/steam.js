const axios = require("axios");
const API_KEY = '---------------';

exports.GetSteamUserInformation = async (req, res) => {
  try{
    const steamID = req.query.steamID;
    const response = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+ API_KEY + '&steamids=' + steamID);
    res.status(200).json(response.data.response.players[0]); // Return the data from Steam API as JSON
  }
  catch (err){
    res.status(500).json({'msg': err});
  }
}
