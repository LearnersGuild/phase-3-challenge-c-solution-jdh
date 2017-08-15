-- Import rooms from CSV
COPY rooms(id, number, capacity)
FROM '/Users/justin/Developer/phase3C-challenge-JDH/part-2/seed-data/rooms.csv'
WITH (FORMAT 'csv', HEADER);

-- Import guests from CSV
COPY guests(id, name, email)
FROM '/Users/justin/Developer/phase3C-challenge-JDH/part-2/seed-data/guests.csv'
WITH (FORMAT 'csv', HEADER);

-- Import bookings from CSV
COPY rooms(id, room_id, guest_id, check_in, check_out)
FROM '/Users/justin/Developer/phase3C-challenge-JDH/part-2/seed-data/bookings.csv'
WITH (FORMAT 'csv', HEADER);
