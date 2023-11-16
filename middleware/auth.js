const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, '----------------------');
       const steamID = decodedToken.steamID;
       req.auth = {
           steamID: steamID
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};