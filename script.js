/**
 * Selects and stores the card elements, time tag, flips tag, and refresh button from the HTML document.
 * 
 * @type {NodeList} cards - The NodeList of card elements.
 * @type {HTMLElement} timeTag - The time tag element.
 * @type {HTMLElement} flipsTag - The flips tag element.
 * @type {HTMLElement} refreshBtn - The refresh button element.
 */
const cards = document.querySelectorAll(".card"),
      timeTag = document.querySelector(".time b"),
      flipsTag = document.querySelector(".flips b"),
      refreshBtn = document.querySelector(".details button");
