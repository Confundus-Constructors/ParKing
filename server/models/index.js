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
  createTransaction: (columns, values) => {
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    return client.query(
      `INSERT INTO transactions(${columns}) VALUES(${placeholders});`, values
    );
  },
  queryReservations: (garageId, status) => {
    return client.query(
      `SELECT qr_code as confirmation_id,
      CONCAT(us.first_name,' ', us.last_name) as "user",
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as "garage"

      FROM transactions ts

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE garage_id = ${garageId}
      AND current_status = '${status}'
      ORDER BY reservation_start_time;`
    );
  },
  queryReservationsParked: (garageId, status) => {
    return client.query(
      `SELECT qr_code as confirmation_id,
      CONCAT(us.first_name,' ', us.last_name) as user,
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as garage,
      ps.position as parking_spot_number

      FROM transactions ts

      INNER JOIN parking_spots ps
      ON ps.id = ts.parking_spot_id

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE gs.id = ${garageId}
      AND ts.current_status = '${status}'
      ORDER BY ts.reservation_start_time;`
    );
  },
  createTransaction: (columns, values) => {
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    return client.query(
      `INSERT INTO transactions(${columns}) VALUES(${placeholders});`, values
    );
  },
  queryReservations: (garageId, status) => {
    return client.query(
      `SELECT qr_code as confirmation_id,
      CONCAT(us.first_name,' ', us.last_name) as "user",
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as "garage"

      FROM transactions ts

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE garage_id = ${garageId}
      AND current_status = '${status}'
      ORDER BY reservation_start_time;`
    );
  },
  queryReservationsParked: (garageId, status) => {
    return client.query(
      `SELECT qr_code as confirmation_id,
      CONCAT(us.first_name,' ', us.last_name) as user,
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as garage,
      ps.position as parking_spot_number

      FROM transactions ts

      INNER JOIN parking_spots ps
      ON ps.id = ts.parking_spot_id

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE gs.id = ${garageId}
      AND ts.current_status = '${status}'
      ORDER BY ts.reservation_start_time;`
    );
  },
  queryCountReservationTimes: (time1, time2) => {
    return client.query(
      `SELECT CAST(COUNT(id) AS INT), garage_id
      FROM transactions
      WHERE
      (reservation_end_time >= $1 AND reservation_end_time <= $2)
      OR
      (reservation_start_time >= $1 AND reservation_start_time <= $2)
      OR
      (reservation_start_time <= $1 AND reservation_end_time >= $2)
      GROUP BY garage_id`,
      [time1, time2]
    );
  },
  queryCountParkingSpots: () => {
    return client.query(
      `SELECT CAST(COUNT(id) AS INT), garage_id
      FROM parking_spots
      GROUP BY garage_id`
    );
  },
  queryReservationStatus: (conf_number) => {
    return client.query(
      `SELECT current_status
      FROM transactions
      WHERE qr_code = '${conf_number}';`
    );
  },
  querySmallestParkingSpot: (conf_number) => {
    return client.query(
      `SELECT ps.id, MIN(ps.position) as "position"
      FROM transactions ts

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      INNER JOIN parking_spots ps
      ON ps.garage_id = gs.id

      WHERE qr_code = '${conf_number}'
      AND ps.is_available = true

      GROUP BY gs.id, ps.id;
      ;`
    );
  },
  queryReservationUponArrival: (conf_number) => {
    return client.query(
      `SELECT qr_code,
      CONCAT(us.first_name,' ', us.last_name) as "user",
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as "garage"
      /* ps.position as "parking_spot_number" */

      FROM transactions ts

      /* INNER JOIN parking_spots ps
      ON ps.id = ts.parking_spot_id */

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE qr_code = '${conf_number}'`
    );
  },
  queryReservationUponCheckout: (conf_number) => {
    return client.query(
      `SELECT qr_code,
      CONCAT(us.first_name,' ', us.last_name) as "user",
      vs.make_model,
      vs.color,
      vs.license_plate,
      reservation_start_time,
      reservation_end_time,
      gs.address_line_1 as "garage",
      ps.position as "parking_spot_number"

      FROM transactions ts

      INNER JOIN parking_spots ps
      ON ps.id = ts.parking_spot_id

      INNER JOIN users us
      ON us.id = ts.user_id

      INNER JOIN vehicles vs
      ON vs.id = ts.vehicle_id

      INNER JOIN garages gs
      ON gs.id = ts.garage_id

      WHERE qr_code = '${conf_number}'`
    );
  },
  updateReservationCheckIn: (conf_number, ps_id) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    // console.log(formattedDate);
      return client.query(
        `UPDATE transactions
        SET check_in_time = '${formattedDate}',
        current_status = 'checked-in',
        parking_spot_id = ${ps_id}
        WHERE qr_code = '${conf_number}';`
    );
  },
  updateParkingSpotStatusCheckIn: (ps_id) => {
    return client.query(`
      UPDATE parking_spots
      SET is_available = false
      WHERE id = '${ps_id}';`
    );
  },
  updateReservationCheckOut: (conf_number) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    // console.log(formattedDate);
      return client.query(
        `UPDATE transactions
        SET check_out_time = '${formattedDate}',
        reservation_end_time = '${formattedDate}',
        current_status = 'checked-out',
        active = false
        WHERE qr_code = '${conf_number}'
        RETURNING parking_spot_id;`
    );
  },
  updateParkingSpotStatusCheckOut: (ps_id) => {
    return client.query(`
      UPDATE parking_spots
      SET is_available = true
      WHERE id = '${ps_id}';`);
  },
};

