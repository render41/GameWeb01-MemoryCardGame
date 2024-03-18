const cards = document.querySelectorAll(".card");
let matchedCard = 0;
let cardFirst, cardSecond;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardFirst && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardFirst) {
      return (cardFirst = clickedCard);
    }
    cardSecond = clickedCard;
    disableDeck = true;
    let cardFirstImage = cardFirst.querySelector("img").src;
    let cardSecondImage = cardSecond.querySelector("img").src;
    matchCards(cardFirstImage, cardSecondImage);
  }
}

function matchCards(imageOne, imageTwo) {
  if (imageOne === imageTwo) {
    matchedCard++;
    console.log(matchedCard);
    if (matchedCard >= 8) {
      setTimeout(() => shuffleCard(), 1100);
    }
    cardFirst.removeEventListener("click", flipCard);
    cardSecond.removeEventListener("click", flipCard);
    cardFirst = cardSecond = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardFirst.classList.add("shake");
    cardSecond.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardFirst.classList.remove("flip", "shake");
    cardSecond.classList.remove("flip", "shake");
    cardFirst = cardSecond = "";
    disableDeck = false;
  }, 1000);
}

function shuffleCard() {
  matchedCard = 0;
  cardFirst = cardSecond = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imageTag = card.querySelector("img");
    imageTag.src = `images/Fruits/fruit-0${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
