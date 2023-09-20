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
    let { firstName, lastName, password, email, phoneNumber, accessToken } = req.body;
    let employee = false;
    await resetSerial();
    client
      .query(
        `INSERT INTO users ( id, first_name, last_name, password, email, phone, is_employee, device_token )
        VALUES ( DEFAULT, $1, $2, $3, $4, $5, $6, $7)
        RETURNING id;`,
        [firstName, lastName, password, email, phoneNumber, employee, accessToken]
      )
      .then((query) => {
        res.status(201).send(query.rows[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
  putUser: async (req, res) => {
    let { password, email, device_token } = req.body;
    await resetSerial();
    client
      .query(
        `UPDATE users
        SET device_token = '${device_token}'
        WHERE email = '${email}'
        AND password = '${password};'
        `,
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
