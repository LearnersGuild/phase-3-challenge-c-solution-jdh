const db = require('./database')
const Table = require('cli-table')

const showResults = funcCall => (results) => {
  console.log('\n========\n')
  console.log(`> ${funcCall} => `)
  console.log('\n')
  console.log(results)
  console.log('\n')
}

const createTable = (data) => {
  // TODO: check if table is empty
  const table = new Table({
    head: Object.keys(data[0]),
  })
  data.forEach((row) => {
    table.push(Object.values(row))
  })
  return table.toString()
}

const displayTable = (promise) => {
  promise
    .then((results) => {
      if (results.length === 0) {
        console.log("No results")
      } else {
        console.log(createTable(results))
      }
    })
    .catch(console.error)
}

const main = () => {
  const [command, flag] = process.argv.slice(2).map((str) => {
    if (str.toLowerCase) return str.toLowerCase()
  })

  switch (command) {
    case 'guests': {
      displayTable(db.allGuests())
      break
    }
    case 'rooms': {
      if (flag === '--available') {
        displayTable(db.availableRooms())
      } else {
        displayTable(db.allRooms())
      }
      break
    }
    case 'bookings': {
      if (flag) {
        displayTable(db.upcomingBookings(flag.toUpperCase()))
      } else {
        displayTable(db.upcomingBookings())
      }
      break
    }
    default:
      break
  }

  db.end()
  return
}


if (!module.parent) {
  main()
}
