const numCards = 12
var flipCards = [];
var numFlipped = 0;
var imgSrcBucket = [
                    'logo_html.jpeg',
                    'logo_java.jpeg',
                    'logo_js.jpeg',
                    'logo_mongodb.jpeg',
                    'logo_php.jpeg',
                    'logo_react.jpeg',
                    'logo_html.jpeg',
                    'logo_java.jpeg',
                    'logo_js.jpeg',
                    'logo_mongodb.jpeg',
                    'logo_php.jpeg',
                    'logo_react.jpeg'];

var flippedCards = [];
var score = 0;

function setupGame () {
    var randomImgSrc = "";
    for (var i = 0; i < numCards; i++) {
        randomImgSrc = getRandomImgSrc();
        console.log(randomImgSrc);
        $('.picture-grid').append(
            `<div class="flip-card-container">` +
                `<div id="flip-card-${i}" class="picture-flip-card">` +
                    `<div class="flip-card-front"> </div>` +
                    `<div class="flip-card-back">` +
                        `<img src="img/` + randomImgSrc + `" alt="randomImgSrc"` + `>` +
                    `</div>` + 
                `</div>` +
            `</div>`
        );
        flipCards.push({id: i, isFlipped: false, hidden: false, src: randomImgSrc});
    }
}

function resetState () {
    $('h1').animate({color: "red"}, 800);
    $('h1').animate({color: "white"}, 500);
    $(`#flip-card-${flippedCards[0].id}`).toggleClass('flipped');
    $(`#flip-card-${flippedCards[1].id}`).toggleClass('flipped');
    flipCards[flippedCards[0].id].isFlipped = false;
    flipCards[flippedCards[1].id].isFlipped = false;
    numFlipped = 0;
    flippedCards = [];
}

function advanceState () {
    $('h1').animate({color: "green"}, 800);
    $('h1').animate({color: "white"}, 500);
    $(`#flip-card-${flippedCards[0].id}`).css('display', 'none');
    $(`#flip-card-${flippedCards[1].id}`).css('display', 'none');
    flipCards[flippedCards[0].id].isFlipped = false;
    flipCards[flippedCards[1].id].isFlipped = false;
    flipCards[flippedCards[0].id].hidden = true;
    flipCards[flippedCards[1].id].hidden = true;
    numFlipped = 0;
    flippedCards = [];
}

function getRandomImgSrc () {
    var randomIndex = Math.floor(Math.random() * imgSrcBucket.length);
    return imgSrcBucket.splice(randomIndex, 1)[0];
}

function checkForComplete () {
    for (const flipCard of flipCards) {
        if (!flipCard.hidden) {
            return flipCard;
        }
    }
    $('p').append(` ${score}.`);
    if (score > 0) {
        $('p').animate({color: "green"}, 2000);
    } else {
        $('p').animate({color: "red"}, 2000);
    }
}

function flip () {

    var flipCardID = this.id.split('-')[2];

    if ((!flipCards[flipCardID].isFlipped) && (numFlipped < 2)) {
        $(this).toggleClass('flipped');
        flipCards[flipCardID].isFlipped = true;
        numFlipped++;
        flippedCards.push(flipCards[flipCardID]);
    }

    if (numFlipped === 2) {
        console.log(flippedCards);
        if (flippedCards[0].src === flippedCards[1].src) {
            score++;
            setTimeout(advanceState, 1000);
            setTimeout(checkForComplete, 1000)
        } else {
            score--;
            setTimeout(resetState, 1000);
        }
    }

}


$(document).ready(function() {
    setupGame();
    $('.picture-flip-card').click(flip);
});

