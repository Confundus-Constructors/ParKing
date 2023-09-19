const client = require("../database/db");
const queryAll = require("../models/index");

module.exports = {
  getAll: (req, res) => {
    queryAll("users");
  },
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
  postUser: async (req, res) => {
    let { firstname, lastname, password, email, phone } = req.body;
    let employee = false;
    console.log(firstname, lastname, email, password, phone);
    await resetSerial();
    client
      .query(
        "INSERT INTO users (id,first_name, last_name, password, email, phone, is_employee ) VALUES ( DEFAULT, $1, $2, $3, $4,$5,$6)",
        [firstname, lastname, password, email, phone, employee]
      )
      .then((query) => {
        res.send(200, query);
      })
      .catch((err) => {
        console.log(err);
        res.send(400, err);
      });
  },
};

const resetSerial = () => {
  client
    .query("SELECT setval('users_id_seq', (select max(id) from users)")
    .catch((err) => {
      console.log(err);
    });
};
