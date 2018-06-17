var wish = require('wish');
var deepEqual = require('deep-equal');

var suits = ['H', 'D', 'S', 'C'];
var values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

var randomSuit = () => {
  return suits[Math.floor(Math.random() * (suits.length))];
};

var randomValue = () => {
  return values[Math.floor(Math.random() * (values.length))];
};

var randomCard = () => {
  return randomValue() + '-' + randomSuit();
};

var randomHand = () => {
  let cards = [];

  var deckSize = 52;
  cards.push(buildFullDeck()[Math.floor(Math.random() * deckSize)]);
  cards.push(buildFullDeck()[Math.floor(Math.random() * deckSize)]);
  cards.push(buildFullDeck()[Math.floor(Math.random() * deckSize)]);
  cards.push(buildFullDeck()[Math.floor(Math.random() * deckSize)]);
  cards.push(buildFullDeck()[Math.floor(Math.random() * deckSize)]);

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
describe('randomCard()', () => {
  it('returns something', () => {
    wish(randomCard().match(/\w{1,2}-[HDSC]/));
  });
});
describe('randomValue()', () => {
  it('returns something', () => {
    wish(randomValue().match(/\w{1,2}/));
  });
});
describe('randomSuit()', () => {
  it('returns something', () => {
    wish(randomSuit().match(/[HDSC]/));
  });
});
