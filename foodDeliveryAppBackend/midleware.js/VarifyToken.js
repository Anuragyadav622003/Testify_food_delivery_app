const jwt = require('jsonwebtoken');
function VerifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(401).json({ error: "Unauthorized:Token not provided" })
    jwt.verify(token,process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ error: 'Unathorized : Invalid token' })
      }
     
      req.user = { userId: decode.id };
      next();
    });
  
  };

  module.exports = VerifyToken;

