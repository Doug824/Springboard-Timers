const collection = document.getElementById("card-collection");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let modal = document.getElementById("popup")
let card = document.getElementsByClassName("card");
let cards = [...card];
let moves = 0;
let count = document.querySelector(".moves");
let matchingCard = document.getElementsByClassName("match");
let iconClose = document.querySelector(".close");

var flippedCards = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Maybe window.onload = gameStart();
document.body.onload = gameStart();

function gameStart() {
    flippedCards = [];
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        collection.innerHTML = "";
        [].forEach.call(cards, function(item) {
            collection.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    count.innerHTML = moves;
    for (var i= 0; i < stars.length; i++) {
        stars[i].style.color = "#c413ca";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
};

var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardFlip() {
    flippedCards.push(this);
    var len = flippedCards.length;
    if(len === 2) {
        if(flippedCards[0].type === flippedCards[1].type){
          matching();
        } else {
          unmatched();
        }
    }
    moveCounter();
};

function matching() {
    flippedCards[0].classList.add("match", "disabled");
    flippedCards[1].classList.add("match", "disabled");
    flippedCards[0].classList.remove("show", "open", "no-event");
    flippedCards[1].classList.remove("show", "open", "no-event");
    flippedCards = [];
};

function unmatched() {
    flippedCards[0].classList.add("unmatched");
    flippedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        flippedCards[0].classList.remove("show", "open", "no-event","unmatched");
        flippedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        flippedCards = [];
    },1100);
}

function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for(var i = 0; i < matchingCard.length; i++) {
            matchingCard[i].classList.add("disabled");
        }
    });
}

var second = 0, minute = 0; hour = 0;
var timerElement = document.querySelector(".timer");
var interval;

function timer() {
  interval = setInterval(function() {
    timerElement.innerHTML = minute+"mins "+second+"secs";
    second++;
    if(second == 60) {
        minute++;
        second=0;
    }
    if(minute == 60) {
      hour++;
      minute = 0;
    }
  },1000);
}

function moveCounter() {
  moves++;
  count.innerHTML = moves;
    if(moves == 1) {
      second = 0;
      minute = 0; 
      hour = 0;
      timer();
    }
    if (moves > 8 && moves < 12) {
      for( i= 0; i < 3; i++){
        if(i > 1){
          stars[i].style.visibility = "collapse";
        }
      }
    }
    else if (moves > 13) {
      for( i= 0; i < 3; i++) {
        if(i > 0) {
          stars[i].style.visibility = "collapse";
        }
      }
    }
}

function congrats() {
  if (matchingCard.length == 16) {
    clearInterval(interval);
    finalTime = timerElement.innerHTML;
    modal.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("lastMove").innerHTML = moves / 2;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("finalTime").innerHTML = finalTime;
    closeModal();
  };
}

function closeModal() {
    iconClose.addEventListener("click", function(e){
        modal.classList.remove("show");
        gameStart();
    });
}

function newGame() {
    modal.classList.remove("show");
    gameStart();
}

for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardFlip);
    card.addEventListener("click", congrats);
};
