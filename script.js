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

/**
 * Game variables
 * @type {number} maxTime - Maximum time for the game in seconds.
 * @type {boolean} disableDeck - Flag to indicate if the deck is disabled.
 * @type {number} flips - Counter for the number of card flips.
 * @type {number} matchedCard - Counter for the number of matched cards.
 * @type {boolean} isPlaying - Flag to indicate if the game is currently playing.
 * @type {HTMLElement} cardOne - The first card selected for comparison.
 * @type {HTMLElement} cardTwo - The second card selected for comparison.
 * @type {number} timer - The timer for the game.
 * @type {number} timeLeft - The remaining time for the game in seconds.
 */
let maxTime = 30,
    disableDeck = false,
    flips = 0,
    matchedCard = 0,
    isPlaying = false,
    cardOne = null,
    cardTwo = null,
    timer = null,
    timeLeft = maxTime;

/**
 * Initializes the timer for the game.
 * Updates the time tag with the remaining time and clears the timer when it reaches zero.
 * @returns {undefined}
 */
function initTimer() {
    // Check if the time left is zero
    if(timeLeft <= 0) {
        // Clear the timer and return
        return clearInterval(timer);
    }
    // Decrement the time left
    timeLeft--;
    // Update the time tag with the remaining time
    timeTag.innerText = timeLeft;
}

/**
 * Handles the card flip event.
 * 
 * @param {Event} event - The click event on the card.
 * @returns {undefined}
 */
function flipCard({target: clickedCard}) {
    // Check if the game is not already playing
    if(!isPlaying) {
        // Start the game and initialize the timer
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }

    // Check if the clicked card is not the same as the first card, the deck is not disabled, and there is still time left
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        // Increment the flips counter and update the flips tag
        flips++;
        flipsTag.innerText = flips;

        // Add the flip class to the clicked card
        clickedCard.classList.add("flip");

        // If no card is currently selected as the first card, select the clicked card as the first card
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        // Select the clicked card as the second card
        cardTwo = clickedCard;

        // Disable the deck temporarily
        disableDeck = true;

        // Get the image sources of the first and second cards
        let cardOneImg = cardOne.querySelector(".two-view img").src,
            cardTwoImg = cardTwo.querySelector(".two-view img").src;

        // Compare the image sources of the first and second cards
        matchCards(cardOneImg, cardTwoImg);
    }
}
/**
 * Function to shuffle the cards and reset the game.
 * 
 * @returns {undefined}
 */
function shuffleCard() {
    // Reset the game variables
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);

    // Update the time and flips tags
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;

    // Reset the game flags
    disableDeck = isPlaying = false;

    // Create an array of card numbers and shuffle it
    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Iterate over each card
    cards.forEach((card, index) => {
        // Remove the flip class from the card
        card.classList.remove("flip");

        // Get the image tag inside the card
        let imgTag = card.querySelector(".two-view img");

        // Set the image source after a delay
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);

        // Add the click event listener to the card
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();


/**
 * Function to match the two selected cards.
 * 
 * @param {string} img1 - The source of the image on the first card.
 * @param {string} img2 - The source of the image on the second card.
 * @returns {undefined}
 */
function matchCards(img1, img2) {
    // Check if the two cards match
    if(img1 === img2) {
        // Increment the matched card counter
        matchedCard++;

        // Check if all cards are matched and there is still time left
        if(matchedCard == 6 && timeLeft > 0) {
            // Clear the timer and return
            return clearInterval(timer);
        }

        // Remove the click event listener from the first and second cards
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Reset the selected cards
        cardOne = cardTwo = "";

        // Enable the deck
        return disableDeck = false;
    }

    // Add the shake class to the first and second cards
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Remove the shake class and flip class from the first and second cards after 1.2 seconds
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        // Reset the selected cards
        cardOne = cardTwo = "";

        // Enable the deck
        disableDeck = false;
    }, 1200);
}


refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(/**
 * Adds a click event listener to the specified card.
 * When a card is clicked, it triggers the flipCard function.
 * 
 * @param {HTMLElement} card - The card element to which the event listener will be added.
 * @returns {undefined}
 */
card => {
    card.addEventListener("click", flipCard);
});