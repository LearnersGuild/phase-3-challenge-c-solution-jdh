CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  number VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id),
  guest_id INTEGER REFERENCES guests(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL
);
