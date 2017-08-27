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
  initiateBooking: function(e) {
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
  modalOpenBtn: () => document.querySelector('.js-modal-open'),

  addToCartBtns: () => document.querySelectorAll('.js-add-to-cart'),
  clearCartBtn: () => document.querySelector('.js-clear-cart'),

  cartCount: () => document.querySelector('.js-cart-count'),
  cartItems: () => document.querySelector('.js-cart-items'),
  cartTotal: () => document.querySelector('.js-cart-total'),
}

// User interface
const UI = {
  refresh: () => {
    UI.renderCartCount()
    UI.renderCartItems()
    UI.renderCartTotal()
  },

  renderCartCount: () => {
    ELEMENTS.cartCount().innerText = `(${Cart.count()})`
  },

  renderCartItems: () => {
    const items = Cart.items.map((item) => {
      return `
        <li class="item flex flex-row-between">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${item.price}</span>
        </li>
      `
    }).join("\n")

    const itemsList = `
      <ul class="item-section">
        {items}
      </ul>
    `

    ELEMENTS.cartItems().innerHTML = itemsList
  },

  renderCartTotal: () => {
    ELEMENTS.cartTotal().innerText = `$${Cart.total()}`
  },

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
