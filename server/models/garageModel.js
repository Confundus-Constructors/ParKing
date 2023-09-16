const client = require('../database/db');

module.exports = {
  insertEntry: (table, obj) => {
    const columns = Object.keys(obj);
    const values = Object.values(obj);
    const valuePlaceholders = columns.map((col, index) => `$${index + 1}`).join(', ');
    return client.query(`INSERT INTO ${table} (${columns}) VALUES (${valuePlaceholders})`, values)
  },
  queryAll: (table) => {
    return client.query(`SELECT * FROM ${table}`)
  },
  queryAllWhere: (table, whereCol, whereCondition) => {
    return client.query(`SELECT * FROM ${table} WHERE ${whereCol} = ${whereCondition}`)
  },
};