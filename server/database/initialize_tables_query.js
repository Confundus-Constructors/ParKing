module.exports = `

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "vehicles" CASCADE;
DROP TABLE IF EXISTS "garages" CASCADE;
DROP TABLE IF EXISTS "valet_company" CASCADE;
DROP TABLE IF EXISTS "transactions" CASCADE;
DROP TABLE IF EXISTS "parking_spots" CASCADE;
DROP TABLE IF EXISTS "employees" CASCADE;

CREATE TABLE "users" (
  id serial PRIMARY KEY NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  is_employee BOOLEAN NOT NULL,
  device_token VARCHAR,
  CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE "vehicles" (
  id serial PRIMARY KEY NOT NULL,
  make_model VARCHAR,
  license_plate VARCHAR NOT NULL,
  color VARCHAR,
  user_id INT NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"(id),
  CONSTRAINT unique_license_plate UNIQUE (license_plate)
);

CREATE TABLE "valet_company" (
  id serial PRIMARY KEY NOT NULL,
  company_name VARCHAR NOT NULL,
  admin_email VARCHAR NOT NULL,
  admin_password VARCHAR NOT NULL
);

CREATE TABLE "garages" (
  id serial PRIMARY KEY NOT NULL,
  valet_company_id INT NOT NULL,
  address_line_1 VARCHAR NOT NULL,
  address_line_2 VARCHAR,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  zip VARCHAR NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  hourly_rate INTEGER NOT NULL,
  FOREIGN KEY ("valet_company_id") REFERENCES "valet_company"(id)
);

CREATE TABLE "parking_spots" (
  id serial PRIMARY KEY NOT NULL,
  garage_id INT NOT NULL,
  position VARCHAR NOT NULL,
  is_available BOOLEAN NOT NULL,
  FOREIGN KEY ("garage_id") REFERENCES "garages"(id)
);

CREATE TABLE "employees" (
  id serial PRIMARY KEY NOT NULL,
  garage_id INT NOT NULL,
  valet_company_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"(id),
  FOREIGN KEY ("garage_id") REFERENCES "garages"(id),
  FOREIGN KEY ("valet_company_id") REFERENCES "valet_company"(id)
);

CREATE TABLE "transactions" (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  garage_id INT NOT NULL,
  parking_spot_id INT,
  employee_id INT,
  /*qr_code BYTEA NOT NULL,*/
  qr_code VARCHAR,
  reservation_start_time TIMESTAMP NOT NULL,
  reservation_end_time TIMESTAMP NOT NULL,
  check_in_time TIMESTAMP,
  check_out_time TIMESTAMP,
  current_status VARCHAR NOT NULL CHECK(current_status IN ('reserved', 'checked-in', 'picking-up', 'checked-out')),
  active BOOLEAN NOT NULL,
  photo VARCHAR,
  FOREIGN KEY ("user_id") REFERENCES "users"(id),
  FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"(id),
  FOREIGN KEY ("garage_id") REFERENCES "garages"(id),
  FOREIGN KEY ("parking_spot_id") REFERENCES "parking_spots"(id),
  FOREIGN KEY ("employee_id") REFERENCES "employees"(id)
);
`
