const client = require('./db.js');
const query = require('./initialize_tables_query.js');
const usersData = require('../../exampleData/users');
const valetCompanyData = require('../../exampleData/valet_companies');
const garagesData = require('../../exampleData/garages');
const parkingSpotsData = require('../../exampleData/parking_spots');
const employeesData = require('../../exampleData/employees');
const vehiclesData = require('../../exampleData/vehicles');
const transactionsData = require('../../exampleData/transactions');

client.query(query)
  .then(() => {
    seedTables('users', usersData);
    seedTables('valet_company', valetCompanyData);
    seedTables('garages', garagesData);
    seedTables('parking_spots', parkingSpotsData);
    seedTables('employees', employeesData);
    seedTables('vehicles', vehiclesData);
    seedTables('transactions', transactionsData);
  })
  .catch((err) => console.log(err));

  const seedTables = async (table, data) => {
    try {
      const columns = Object.keys(data[0]); // Assuming all objects have the same keys
      const values = data.map((rowData) => {
        return columns.map((col) => rowData[col]);
      });

      const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ($1, $2, $3, $4, $5, $6, $7, ...)`;

      // Use a transaction to ensure data consistency
      await client.query('BEGIN');
      for (const rowValues of values) {
        await client.query(query, rowValues);
      }
      await client.query('COMMIT');

      console.log(`${table} table seeded successfully`);
    } catch (error) {
      console.error(`Error seeding ${table} table:`, error);
      await client.query('ROLLBACK');
    } finally {
      // You may or may not want to close the client connection here
      // client.end();
    }
  };