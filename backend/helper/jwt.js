var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      //regular expression
      { url: /\/api\/v1\/product(.*)/, methods: ["GET"] }, //.* indicates the other ui link after product
      { url: /\/api\/v1\/category(.*)/, methods: ["GET"] }, // methods indicates the http method to allow
      { url: /\/api\/v1\/transaction(.*)/, methods: ["GET"] },

      `${api}/user/login`,
      `${api}/user/register`,
    ],
  });
}
async function isRevoked(req, token) {
  return false;
}

module.exports = authJwt;
