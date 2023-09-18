const client = require("../database/db");

module.exports = {
  insertEntry: (table, obj) => {
    const columns = Object.keys(obj);
    const values = Object.values(obj);
    const valuePlaceholders = columns
      .map((col, index) => `$${index + 1}`)
      .join(", ");
    return client.query(
      `INSERT INTO ${table} (${columns}) VALUES (${valuePlaceholders})`,
      values
    );
  },
  queryAll: (table) => {
    return client.query(`SELECT * FROM ${table}`);
  },
  queryAllWhere: (table, whereCol, whereCondition) => {
    return client.query(
      `SELECT * FROM ${table} WHERE ${whereCol} = ${whereCondition}`
    );
  },
  queryCountReservationTimes: (time1, time2) => {
    return client.query(
      `SELECT CAST(COUNT(id) AS INT), garage_id
      FROM transactions
      WHERE
      (reservation_end_time >= '${time1}' AND reservation_end_time <= '${time2}')
      OR
      (reservation_start_time >= '${time1}' AND reservation_start_time <= '${time2}')
      OR
      (reservation_start_time <= '${time1}' AND reservation_end_time >= '${time2}')
      GROUP BY garage_id`
    );
  },
  queryCountParkingSpots: () => {
    return client.query(
      `SELECT CAST(COUNT(id) AS INT), garage_id
      FROM parking_spots
      GROUP BY garage_id`
    );
  },
  queryReservationUponArrival: (conf_number) => {
    return client.query(
      `SELECT qr_code, reservation_start_time, reservation_end_time, ps.position
      FROM transactions ts
      INNER JOIN parking_spots ps
      ON ps.id = ts.parking_spot_id
      WHERE qr_code = '${conf_number}'`
    );
  },
};
