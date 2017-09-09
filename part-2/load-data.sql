\c hotel_db

-- must be done in this order for referential integrity
DELETE FROM bookings;
DELETE FROM guests;
DELETE FROM rooms;

-- Import rooms from CSV
COPY rooms(id, number, capacity)
FROM '/Users/jhaa/Developer/phase-3-challenge-c-solution-jdh/part-2/seed-data/rooms.csv'
WITH (FORMAT 'csv', HEADER);

-- Import guests from CSV
COPY guests(id, name, email)
FROM '/Users/jhaa/Developer/phase-3-challenge-c-solution-jdh/part-2/seed-data/guests.csv'
WITH (FORMAT 'csv', HEADER);

-- Import bookings from CSV
COPY bookings(id, room_id, guest_id, check_in, check_out)
FROM '/Users/jhaa/Developer/phase-3-challenge-c-solution-jdh/part-2/seed-data/bookings.csv'
WITH (FORMAT 'csv', HEADER);
