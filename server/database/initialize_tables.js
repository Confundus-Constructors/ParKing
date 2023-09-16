const client = require('./db.js');
const query = require('./initialize_tables_query.js');

// const query = `CREATE TABLE "users" (
//   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
//   first_name VARCHAR NOT NULL,
//   last_name VARCHAR NOT NULL,
//   email VARCHAR NOT NULL,
//   phone VARCHAR NOT NULL,
//   is_employee BOOLEAN NOT NULL
// );`

client.query(query)
  // .then(() => console.log('success'))
  .catch((err) => console.log(err))
