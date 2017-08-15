const pgp = require('pg-promise')();

const db = pgp('postgres://justin@localhost:5432/hotel_db');

function allGuests() {
  return db.query(`
    SELECT
      id AS "ID",
      name AS "Guest Name",
      email AS "Email"
    FROM guests;`);
}

function allRooms() {
  return db.query(`
    SELECT
      rooms.number AS "Room #",
      rooms.capacity AS "Capacity",
      (rooms.id NOT IN
        (
          SELECT room_id
          FROM bookings
          WHERE current_date
          BETWEEN check_in AND check_out
        )
      ) AS "Available"
    FROM rooms
    ORDER BY rooms.number ASC;
    `);
}

function availableRooms() {
  return db.query(`
      SELECT
        number AS "Room #",
        capacity AS "Capacity",
        (TRUE) AS "Available"
      FROM rooms
      WHERE id NOT IN (
        SELECT room_id
        FROM bookings
        WHERE current_date
        BETWEEN check_in AND check_out
      );
      `);
}


module.exports = {
  allGuests,
  allRooms,
  availableRooms,
};

if (!module.parent) {
  const showResults = funcCall => (results) => {
    console.log('\n========\n');
    console.log(`> ${funcCall} => `);
    console.log('\n');
    console.log(results);
    console.log('\n');
  };

  allGuests().then(showResults('allGuests()'));
  allRooms().then(showResults('allRooms()'));
  availableRooms().then(showResults('availableRooms()'));

  pgp.end();
}
