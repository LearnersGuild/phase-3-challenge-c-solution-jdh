const chai = require('chai');
const expect = chai.expect;

const {
  allGuests,
  allRooms,
  availableRooms,
  upcomingBookings,
} = require('./database.js');

describe('allGuests()', () => {
  it('', (done) => {
    allGuests()
      .then((results) => {
        // const names = results.map(item => item.name);
        //
        // expect(results[0]).to.have.all.keys('id', 'name');
        // expect(names.sort()).to.deep.equal(['Flour', 'Pasta', 'Rice'].sort());
        done();
      })
      .catch(console.error);
  });
});
