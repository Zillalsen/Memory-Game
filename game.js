let startBtn = document.querySelector(".start-game");
let wrapper = document.querySelector(".wrapper");
let cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disabled = false;
let matched = 0;

startBtn.addEventListener("click", () => {
  wrapper.classList.add("show");
  startBtn.style.display = "none";
});

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function flipCard(element) {
  let clickedCard = element.target;
  if (clickedCard !== cardOne && !disabled) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      // return the cardone value to clicked card
      return (cardOne = clickedCard);
    }
    disabled = true;
    cardTwo = clickedCard;
    // call cardimg
    let firstImg = cardOne.querySelector("img").src,
      secondeImg = cardTwo.querySelector("img").src;
    matchCards(firstImg, secondeImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        return shuffelCards();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disabled = false);
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      return (disabled = false);
    }, 1200);
  }
}
function shuffelCards() {
  matched = 0;
  disabled = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `./Memory Card Game Images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffelCards();
