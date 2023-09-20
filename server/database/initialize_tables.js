const client = require('./db.js');
const query = require('./initialize_tables_query.js');
const usersData = require('../../exampleData/users');
const valetCompanyData = require('../../exampleData/valet_companies');
const garagesData = require('../../exampleData/garages');
const parkingSpotsData = require('../../exampleData/parking_spots');
const employeesData = require('../../exampleData/employees');
const vehiclesData = require('../../exampleData/vehicles');
const transactionsData = require('../../exampleData/transactions');

alterStatementsArray = [
  "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));",
  "SELECT setval('vehicles_id_seq', (SELECT MAX(id) FROM vehicles));",
  "SELECT setval('garages_id_seq', (SELECT MAX(id) FROM garages));",
  "SELECT setval('parking_spots_id_seq', (SELECT MAX(id) FROM parking_spots));",
  "SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));",
  "SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));",
];

(async () => {
  try {
    await client.query(query);
    await seedTables('users', usersData);
    await seedTables('valet_company', valetCompanyData);
    await seedTables('garages', garagesData);
    await seedTables('parking_spots', parkingSpotsData);
    await seedTables('employees', employeesData);
    await seedTables('vehicles', vehiclesData);
    await seedTables('transactions', transactionsData);
    for (let element of alterStatementsArray) {
      element.toString();
      console.log(element);
      await client.query(element);
    }
    await client.end();
  } catch (err) {
    console.error(err);
  }
})();

  const seedTables = async (table, data) => {
    try {
      let columns = Object.keys(data[0]);
      const valuePlaceholders = columns.map((col, index) => `$${index + 1}`).join(', ');
      const values = data.map((rowData) => {
        return columns.map((col) => rowData[col]);
      });

      const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${valuePlaceholders})`;

      await client.query('BEGIN');
      for (const rowValues of values) {
        await client.query(query, rowValues);
      }
      await client.query('COMMIT');

      console.log(`${table} table seeded successfully`);
    } catch (error) {
      console.error(`Error seeding ${table} table:`, error);
      await client.query('ROLLBACK');
    }
  };