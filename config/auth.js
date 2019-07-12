const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  let token = req.get("Authorization") || req.query.token || req.body.token;
  console.log('config/auth reached')
  if (token) {
    console.log('token exist')
    token = token.replace("Bearer ", "");
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        req.user = decoded.user;
        console.log(req.user)
        next();
      }
    });
  } else {
    console.log('')
      next();
  }
};