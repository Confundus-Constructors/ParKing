const client = require("../database/db");

module.exports = {
  getUser: (req, res) => {
    let { email, password } = req.query;
    console.log(email, password);
    client
      .query("SELECT * FROM users WHERE password=$1 AND email=$2", [
        password,
        email,
      ])
      .then((tab) => {
        tab.rows.length > 0
          ? res.send(201, tab.rows)
          : res.send(404, "Incorrect email or password");
      })
      .catch((err) => {
        res.send(400, err);
      });
  },
  postUser: (req, res) => {
    let { firstname, lastname, password, email, phone } = req.body;
    let employee = false;
    console.log(firstname, lastname, email, password, phone);
    client
      .query("INSERT INTO users values($1,$2,$3,$4,$5,$6,$7)", [
        firstname,
        lastname,
        password,
        email,
        phone,
      ])
      .then((query) => {
        res.send(200, query);
      })
      .catch((err) => {
        res.send(400, err);
      });
  },
};
