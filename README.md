# Phase 3 Interview Challenge C

This is the challenge for getting into phase 3. There are 3 parts to the challenge.

To get started, create a new repository called `phase-3-challenge-c`. Do all of your work in this repo and submit it as your solution.

Skills covered:

- Programming
- Programming in JS
- Node.js
- HTTP
- HTTP Applications
- HTML & CSS
- The Browser
- SQL

Each requirement has a point value. A fully complete requirement gets full points; partially complete requirements get partial points; incomplete requirements get no points. Completeness is determined by calculating points earned divided by total points available.

## General Requirements

- [ ] __10:__ Solution is in a public repository called `phase-3-challenge-c`.
- [ ] __10:__ Solution repository has 3 folders: `part-1`, `part-2`, and `part-3`.
- [ ] __10:__ Solution repository includes a `.gitignore` ignoring files that don't shouldn't be committed (e.g. `node_modules/`, `*.log` files).
- [ ] __10:__ Parts 1 and 2 have their own `package.json` specifying dependencies.
- [ ] __20:__ Git history shows frequent commits.

## Part 1: Simple web app

Build a very basic web API which conforms to the routes listed below.

Use Express. You don't need to use an HTML templater like EJS or Pug. (You can use `curl` or `Postman` to check whether the routes work)

The web server should provide the following routes:

```
GET /api/shout/:word
POST /api/array/merge
```

#### Route 1: GET /api/shout/:word
Shout the word back! Return the value of the URL parameter `:word` converted to ALL CAPS and with three exclamation points added to the end.

Example requests:
```
request: GET /api/shout/popcorn
response: POPCORN!!!
status: 200

request: GET /api/shout/friday
response: FRIDAY!!!
status: 200
```

#### Route 2: POST /api/array/merge
When given a request with a JSON body containing two arrays (at keys "a" and "b"), it will respond with JSON containing two arrays merged together at the key "result". By merging array "b" into array "a", the new array will have all the elements from each, but alternating between them. For example:

```javascript
merge([1,2,3], [10,11,12]) => [1,10,2,11,3,12]
```

Example requests:
```
request: POST /api/array/merge
request body: {"a": ["one","two"],
               "b": ["three","four"]}
request content type: application/json
response status code: 200
response: {"result": ["one","three","two","four"]}
response content type: application/json

request: POST /api/array/merge
request body: {"a": [10,100],
               "b": [50,500]}
request content type: application/json
response status code: 200
response: {"result": [10,50,100,500]}
response content type: application/json

request: POST /api/array/merge
request body: {"a": "abcd",
               "b": [5,6]}
request content type: application/json
response status code: 400
response: {"error": "Both keys in request body must be of type Array."}
response content type: application/json
```

### Requirements

- [ ] __10:__ All files are stored under the `part-1/` folder
- [ ] __10:__ All dependencies are specified in a `package.json` file
- [ ] __10:__ Web server can be started with `npm start` command
- [ ] __20:__ GET requests to the `/api/shout/:word` route responds with  content type `application/text`, as described in the example above
- [ ] __80:__ POST requests to the `/api/array/merge` merge the two arrays provided in the request body and responds with the result. An invalid input should return a 400 response.

## Part 2: Command Line Hotel Management System

Build a command line tool that emulates a hotel management system for tracking room bookings. The tool will interact with a PostgreSQL database to store and retrieve information. You will have to design a database to store **guests**, **rooms**, and **bookings**. Let's call the database `hotel_db`.

You'll need to design the schema and write some SQL statements to insert data. Look closely at the commands and their sample outputs to determine how to design your schema.

Write a command line script called `hotel.js` that retrieves information from the database.

The `hotel.js` command should support the following sub commands:

| command  | description                                     | example usage                       |
|:---------|:------------------------------------------------|:------------------------------------|
| guests   | lists all guests                                | `node hotel.js guests`              |
| rooms    | lists rooms and current availability            | `node hotel.js rooms [--available]` |
| bookings | lists the room bookings (room # and guest name) | `node hotel.js bookings [<room #>]` |

### Example Usage

Note: The example output below is not exactly what you would see in reality. (Since the output would depend on the seed data that you add to your database) Use the output below as a template for how each command should display the data.

#### List all `guests`
```
$ node hotel.js guests
|----+------------------+---------------------------|
| ID | Guest Name       | Email                     |
|----+------------------+---------------------------|
|  1 | Scott Grigoryov  | sgrigoryov0@salon.com     |
|  2 | Jerrome Nickolls | jnickolls1@techcrunch.com |
|  3 | Renell Meek      | rmeek2@ucoz.com           |
|  4 | Emilio Heinle    | eheinle3@squarespace.com  |
|  5 | Holli Elliston   | helliston4@umich.edu      |
|  6 | Marcia Nelthropp | mnelthropp5@huffpo.com    |
|----+------------------+---------------------------|
```

#### List all rooms along with their capacity and current availability
```
$ node hotel.js rooms
|--------+----------+-----------|
| Room # | Capacity | Available |
|--------+----------+-----------|
| 2A     | 4        | true      |
| 2B     | 2        | true      |
| 3A     | 3        | false     |
| 3B     | 4        | false     |
| 4A     | 2        | true      |
|--------+----------+-----------|
```

#### List only available rooms with the `--available` option
```
$ node hotel.js rooms --available
|--------+----------+-----------|
| Room # | Capacity | Available |
|--------+----------+-----------|
| 2A     | 4        | true      |
| 2B     | 2        | true      |
| 4A     | 2        | true      |
|--------+----------+-----------|
```

#### List all upcoming room bookings (soonest check-in date first)
Note: _only_ show current and future bookings (i.e. the check out date is _after_ the current date). The examples below assume a current date of 2017-08-31, so your data will look different depending on when you use this command.

```
$ node hotel.js bookings
|--------+------------------+------------+------------|
| Room # | Guest Name       | Check-In   | Check Out  |
|--------+------------------+------------+------------|
| 3A     | Renell Meek      | 2017-08-20 | 2017-09-10 |
| 3B     | Holli Elliston   | 2017-08-30 | 2017-09-02 |
| 2A     | Marcia Nelthropp | 2017-09-03 | 2017-09-05 |
| 3B     | Emilio Heinle    | 2017-09-04 | 2017-09-10 |
| 4A     | Scott Grigoryov  | 2017-09-07 | 2017-09-09 |
|--------+------------------+------------+------------|
```

#### List room bookings for one room (soonest check-in date first)
Note: _only_ show current and future bookings (i.e. the check out date is _after_ the current date). The examples below assume a current date of 2017-08-31, so your data will look different depending on when you use this command.

```
$ node hotel.js bookings 3B
|--------+------------------+------------+------------|
| Room # | Guest Name       | Check-In   | Check Out  |
|--------+------------------+------------+------------|
| 3B     | Holli Elliston   | 2017-08-30 | 2017-09-02 |
| 3B     | Emilio Heinle    | 2017-09-04 | 2017-09-10 |
|--------+------------------+------------+------------|
```

### Requirements
- [ ] __10:__ All files are stored under the `part-2/` folder
- [ ] __10:__ Database schema (all `CREATE TABLE` statements) is defined in a file `schema.sql`
- [ ] __10:__ SQL statements to insert seed data into all tables is added to the file `load-data.sql` (either create your own seed data or use the files provided: [rooms.csv][hotel-rooms] | [bookings.csv][hotel-bookings] | [guests.csv][hotel-guests])
- [ ] __10:__ All database query functions are written in a file `database.js`, and tests for queries are written in a file `database_test.js`
- [ ] __10:__ Tests can be run with the command `$ npm test`

User Stories: Ensure that your schema design can satisfy the following scenarios
- [ ] __10__: As a hotel manager I can get a list of all guests
- [ ] __10__: As a hotel manager I can get a list of all rooms
- [ ] __10__: As a hotel manager I can see which rooms have been booked by which guests, along with their check-in and check out dates

Command line interface requirements
- [ ] __10__: There is a Node script called `hotel.js` that can be called with different commands
- [ ] __20__: Command `guests` has been implemented to the above specifications
- [ ] __30__: Command `rooms` has been implemented to the above specifications
- [ ] __30__: Command `bookings` has been implemented to the above specifications

Write tests with [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) in `database_test.js` that assert:
- [ ] __20__: The database function for the command `guests` is tested
- [ ] __20__: The database function for the command `rooms` is tested
- [ ] __20__: The database function for the command `bookings` is tested

## Part 3: Web interface for hotel manager

Create a front-end only site for a hotel manager where guests can choose from a list of rooms to book.

You only need to write HTML, CSS, and JavaScript. No web server is required.

The initial layout has already been provided for you in the [hotel.html][hotel-html] and [styles.css][hotel-css] files. From this base, build the modal and add interactive behavior with JS.

Note: the "Confirm" button in the modal doesn't need to do anything. Just leave it as a placeholder button.

### Wireframe

Clicking on the "Book" button for any room opens the "Booking" modal.

![modal](https://user-images.githubusercontent.com/709100/29230971-4ed7acc6-7eb3-11e7-9266-d40be6afe004.png)

### Requirements

- [ ] __10:__ All files are stored under the `part-3/` folder
- [ ] __20:__ No third party CSS or JS libraries are used (all code must be written from scratch)
- [ ] __10:__ HTML, CSS, and JS are separated into their own files.
- [ ] __20:__ Clicking on the "Book" button for a room will open the "Booking" modal with the room info automatically inserted (room number and nightly rate)
- [ ] __20:__ Users can select a check-in date (using an HTML5 date input) and a number of nights
- [ ] __20:__ The "Total" in the "Booking" modal shows the total sum (formula: nightly rate multiplied by number of nights)
- [ ] __20:__ Whenever the number of nights changes, the total is updated automatically
- [ ] __20:__ Clicking on the "X" button in the "Booking" modal closes the modal

[hotel-bookings]: https://gist.github.com/lg-bot/1ea5b9cb6dfab086bcb2db3d144e81d4#file-bookings-csv
[hotel-guests]: https://gist.github.com/lg-bot/1ea5b9cb6dfab086bcb2db3d144e81d4#file-guests-csv
[hotel-rooms]: https://gist.github.com/lg-bot/1ea5b9cb6dfab086bcb2db3d144e81d4#file-rooms-csv

[hotel-html]: https://gist.github.com/lg-bot/1ea5b9cb6dfab086bcb2db3d144e81d4#file-hotel-html
[hotel-css]: https://gist.github.com/lg-bot/1ea5b9cb6dfab086bcb2db3d144e81d4#file-styles-css
