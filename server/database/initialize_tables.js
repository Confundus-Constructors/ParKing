const client = require('./db.js');
const query = require('./initialize_tables_query.js');
const usersData = require('../../exampleData/users');
const valetCompanyData = require('../../exampleData/valet_companies');
const garagesData = require('../../exampleData/garages');
const parkingSpotsData = require('../../exampleData/parking_spots');
const employeesData = require('../../exampleData/employees');
const vehiclesData = require('../../exampleData/vehicles');
const transactionsData = require('../../exampleData/transactions');

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
    await client.end();
  } catch (err) {
    console.error(err);
  } finally {
    // Close the client connection if needed
    // client.end();
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