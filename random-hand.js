var wish = require('wish');
var deepEqual = require('deep-equal');

var suits = ['H', 'D', 'S', 'C'];
var values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

var spliceCard = function(cardArray) {
  var takeAway = cardArray.splice(
    Math.floor(Math.random() * cardArray.length), 1)[0];
  return [takeAway, cardArray];
};

var randomHand = () => {
  let cards = [];

  let deckOfCards = buildFullDeck();

  for (let i = 0; i < 5; i++) {
    [cards[i], deckOfCards] = spliceCard(deckOfCards);
  }

  return cards;
};

var buildFullDeck = () => {
  var tempArray = [];
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      tempArray.push(values[i] + '-' + suits[j])
    }
  };
  return tempArray;
};

describe('buildFullDeck()', () => {
  it('gives a card array', function() {
    wish(deepEqual(buildFullDeck(), ['1-H', '1-D', '1-S', '1-C',
      '2-H', '2-D', '2-S', '2-C',
      '3-H', '3-D', '3-S', '3-C', '4-H', '4-D', '4-S', '4-C',
      '5-H', '5-D', '5-S', '5-C', '6-H', '6-D', '6-S', '6-C',
      '7-H', '7-D', '7-S', '7-C', '8-H', '8-D', '8-S', '8-C',
      '9-H', '9-D', '9-S', '9-C', '10-H', '10-D', '10-S', '10-C',
      'J-H', 'J-D', 'J-S', 'J-C', 'Q-H', 'Q-D', 'Q-S', 'Q-C',
      'K-H', 'K-D', 'K-S', 'K-C'
    ]));
  });
});

describe('check that random hands work', () => {
  it('returns an array of length 5', () => {
    wish(randomHand().length === 5);
  })
});


describe('spliceCard()', function() {
  it('returns two things', function() {
    wish(spliceCard(buildFullDeck()).length === 2);
  });
  it('returns the selected card', function() {
    wish(spliceCard(buildFullDeck())[0].match(/\w{1,2}-[HDSC]/));
  });
  it('returns an array with one card gone', function() {
    wish(spliceCard(buildFullDeck())[1].length ===
      buildFullDeck().length - 1);
  });
});
