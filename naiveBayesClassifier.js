const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

// songs
let imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
let somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
let tooManyCooks = ['c', 'g', 'f'];
let iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
let babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
let creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
let paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
let toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
let bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

function train(chords, label) {
  songs.push([label, chords]);
  labels.push(label);

  for (var i = 0; i < chords.length; i++) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]); // a hashset of every single cord that has been fed in
    }
  }

  if (Object.keys(labelCounts).includes(label)) {
    labelCounts[label] = labelCounts[label] + 1; // A hashmap of all the labels and how many times they've been fed in
  } else {
    labelCounts[label] = 1;
  }
};

function setLabelProbabilities() {
  var numberOfSongs = songs.length;

  Object.keys(labelCounts).forEach(label => {
    labelProbabilities[label] = labelCounts[label] / numberOfSongs; // the probability of each label in the total memory
  });
};

function setChordCountsInLabels() {
  songs.forEach(song => {
    let label = chordCountsInLabels[song[0]];

    if (label === undefined) {
      chordCountsInLabels[song[0]] = {};
    }

    let chords = song[1];

    chords.forEach(chord => {
      if (chordCountsInLabels[song[0]][chord] > 0) {
        chordCountsInLabels[song[0]][chord]++;
      } else {
        chordCountsInLabels[song[0]][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;

  Object.keys(probabilityOfChordsInLabels).forEach(difficulty => {
    Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(chords => {
      let chance = probabilityOfChordsInLabels[difficulty][chords] / songs.length;
      probabilityOfChordsInLabels[difficulty][chords] = chance;
    });
  });
}

train(imagine, EASY);
train(somewhere_over_the_rainbow, EASY);
train(tooManyCooks, EASY);
train(iWillFollowYouIntoTheDark, MEDIUM);
train(babyOneMoreTime, MEDIUM);
train(creep, MEDIUM);
train(paperBag, HARD);
train(toxic, HARD);
train(bulletproof, HARD);

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

function classify(chords) {
  const SMOOTHING = 1.01;

  console.log(labelProbabilities);

  var classified = {};

  Object.keys(labelProbabilities).forEach(difficulty => {
    var first = labelProbabilities[difficulty] + SMOOTHING;
    chords.forEach(chord => {
      var probabilityOfChordInLabel = probabilityOfChordsInLabels[difficulty][chord];

      if (probabilityOfChordInLabel !== undefined) {
        first = first * (probabilityOfChordInLabel + SMOOTHING);
      }
    });

    classified[difficulty] = first;
  });

  console.log(classified);
};

classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
