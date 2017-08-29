const STORE = {
  modalVisible: false,

  roomNumber: undefined,

  rate: undefined,

  nights: undefined,

  total: () => STORE.rate * STORE.nights,

  load: (room) => {
    STORE.roomNumber = room.roomNumber
    STORE.rate = room.rate
    STORE.nights = 1
  },

  clear: () => {
    STORE.roomNumber = undefined
    STORE.rate = undefined
    STORE.nights = undefined
  },
}

// Utility function to parse item data from the element
const parseItem = (roomElem) => {
  const tdArray = roomElem.querySelectorAll('td')

  const roomNumber = tdArray[0].innerText

  // Could also use .match(/\d+\.\d+/)[0]
  const rate = parseFloat(tdArray[2].innerText.substr(1))

  return { roomNumber, rate }
}

/* eslint-disable object-shorthand, func-names */
// Primary user actions
const ACTIONS = {
  openBooking: function(e) {
    e.preventDefault()

    const buttonElem = this
    const roomElem = buttonElem.parentElement.parentElement

    const room = parseItem(roomElem)

    STORE.modalVisible = true

    STORE.load(room)
    UI.refresh()
  },

  changeNights: function (e) {
    e.preventDefault()

    const inputElem = this
    const nights = inputElem.value

    STORE.nights = nights
    UI.refresh()
  },

  closeBooking: function(e) {
    e.preventDefault()

    STORE.modalVisible = false

    STORE.clear()
    UI.refresh()
  },
}



// Main interactive elements
const ELEMENTS = {
  modalContainer: () => document.querySelector('.modal-container'),
  modalCloseBtn: () => document.querySelector('.js-modal-close'),

  openBookingBtns: () => document.querySelectorAll('.js-open-booking'),

  bookingRoomNumber: () => document.querySelector('#js-booking-room-number'),
  bookingRate: () => document.querySelector('#js-booking-rate'),
  bookingNumNights: () => document.querySelector('.js-booking-num-nights'),
  bookingTotal: () => document.querySelector('.js-booking-total'),
}

// User interface
const UI = {
  refresh: () => {
    UI.renderBookingDetails()
    UI.renderBookingTotal()
    UI.renderNights()
    UI.renderModal()
  },

  renderBookingDetails: () => {
    ELEMENTS.bookingRoomNumber().innerText = STORE.roomNumber
    if (STORE.rate) {
      ELEMENTS.bookingRate().innerText = `$${STORE.rate.toFixed(2)}`
    }
  },

  renderNights: () => {
    ELEMENTS.bookingNumNights().value = STORE.nights
  },

  renderBookingTotal: () => {
    if (STORE.total()) {
      ELEMENTS.bookingTotal().innerText = `$${STORE.total().toFixed(2)}`
    }
  },

  renderModal: () => {
    STORE.modalVisible ? UI.showModal() : UI.hideModal()
  },

  showModal: function () {
    const modalContainer = ELEMENTS.modalContainer()

    modalContainer.style.display = ''
    modalContainer.style.visibility = 'visible'
  },

  hideModal: function() {
    console.log('hide modal')
    const modalContainer = ELEMENTS.modalContainer()

    modalContainer.style.display = 'none'
    modalContainer.style.visibility = 'hidden'
  },
}

// Load all app event listeners
ELEMENTS.openBookingBtns().forEach((btn) => {
  btn.addEventListener('click', ACTIONS.openBooking)
})

ELEMENTS.modalCloseBtn().addEventListener('click', ACTIONS.closeBooking)

ELEMENTS.bookingNumNights().addEventListener('input', ACTIONS.changeNights)
