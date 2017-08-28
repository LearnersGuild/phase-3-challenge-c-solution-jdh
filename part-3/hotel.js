const Booking = {
  roomNumber: undefined,

  rate: undefined,

  nights: undefined,

  total: () => Booking.rate * Booking.nights,

  initialize: (room) => {
    Booking.roomNumber = room.roomNumber
    Booking.rate = room.rate
    Booking.nights = 1
  },

  clear: () => {
    Booking.roomNumber = undefined
    Booking.rate = undefined
    Booking.nights = undefined
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

    Booking.initialize(room)
    UI.refresh()
  },

  clearBooking: function(e) {
    e.preventDefault()

    Booking.clear()
    UI.refresh()
  },
}



// Main interactive elements
const ELEMENTS = {
  modalContainer: () => document.querySelector('.modal-container'),
  modalCloseBtn: () => document.querySelector('.js-modal-close'),

  openBookingBtns: () => document.querySelectorAll('.js-open-booking'),
  // clearCartBtn: () => document.querySelector('.js-clear-cart'),

  bookingRoomNumber: () => document.querySelector('.js-booking-room-number'),
  bookingRate: () => document.querySelector('.js-booking-rate'),
  bookingNumNights: () => document.querySelector('.js-booking-num-nights'),
  bookingTotal: () => document.querySelector('.js-booking-total'),
}

// User interface
const UI = {
  refresh: () => {
    UI.initializeBooking()
    UI.renderBookingDetails()
    UI.renderBookingTotal()
  },

  initializeBooking: () => {
    ELEMENTS.bookingNumNights().value = 1
  },

  renderBookingDetails: () => {
    ELEMENTS.bookingRoomNumber().innerText = Booking.roomNumber
    ELEMENTS.bookingRate().innerText = `$${Booking.rate}`
  },

  renderBookingTotal: () => {
    ELEMENTS.bookingTotal().innerText = `$${Booking.total()}`
  },

// Continue work below --v
  showModal: function(e) {
    e.preventDefault()

    const modalContainer = ELEMENTS.modalContainer()

    modalContainer.style.display = 'inherit'
    modalContainer.style.visibility = 'visible'
  },

  hideModal: function(e) {
    e.preventDefault()

    const modalContainer = ELEMENTS.modalContainer()

    modalContainer.style.display = 'none'
    modalContainer.style.visibility = 'hidden'
  },
}

// Load all app event listeners
ELEMENTS.addToCartBtns().forEach((btn) => {
  btn.addEventListener('click', ACTIONS.addItemToCart)
})

ELEMENTS.clearCartBtn().addEventListener('click', ACTIONS.clearCart)

ELEMENTS.modalOpenBtn().addEventListener('click', UI.showModal)
ELEMENTS.modalCloseBtn().addEventListener('click', UI.hideModal)
