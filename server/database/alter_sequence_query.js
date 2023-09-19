module.exports = {
  users: `ALTER SEQUENCE "users_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "users");`,
  vehicles: `ALTER SEQUENCE "vehicles_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "vehicles");`,
  valet_company: `ALTER SEQUENCE "valet_company_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "valet_company");`,
  garages: `ALTER SEQUENCE "garages_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "garages");`,
  parking_spots: `ALTER SEQUENCE "parking_spots_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "parking_spots");`,
  employees: `ALTER SEQUENCE "employees_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "employees");`,
  transactions: `ALTER SEQUENCE "transactions_id_seq" RESTART WITH (SELECT MAX(id) + 1 FROM "transactions");`,
};