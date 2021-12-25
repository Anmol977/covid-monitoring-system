const jwt = require('jsonwebtoken');
const logger = require('../logger')

function generateUserToken(userDetails) {
     try {
          let token = jwt.sign(
               userDetails
               , process.env.ACCESS_TOKEN_SECRET,
               {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
               });
          return token;
     } catch (e) {
          logger.error(e);
     }
}

function validateJwtToken(token, res, next) {
     try {
          var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          return decoded;
     } catch (e) {
          res.status(403).send(e);
          next();
     }
}

module.exports = { generateUserToken, validateJwtToken };