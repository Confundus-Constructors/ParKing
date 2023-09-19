var passport = require("passport");
var LocalStrategy = require("passport-local");
var cyrpto = require("crypto");
var client = require("../database/db");

export const userLogin = (req, res) => {
  passport.use(
    new LocalStrategy(function verify(username, password, done) {
      client.query(
        "SELECT * FROM users WHERE email=$1 AND password=$2",
        [username, password],
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        }
      );
    })
  );
};
