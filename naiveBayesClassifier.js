let fs = require('fs');
// songs
let imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
let somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
let tooManyCooks = ['c', 'g', 'f'];
let iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
let babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
let creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
let army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
let paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
  'em7', 'a7', 'f7', 'b'
];
let toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
  'g7'
];
let bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
let song_11 = [];

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

  if (!!(Object.keys(labelCounts).includes(label))) {
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
  songs.forEach(labelChordPair => {
    let label = chordCountsInLabels[labelChordPair[0]];

    if (label === undefined) {
      chordCountsInLabels[labelChordPair[0]] = {};
    }

    let chords = labelChordPair[1];

    chords.forEach(chord => {
      if (chordCountsInLabels[labelChordPair[0]][chord] > 0) {
        chordCountsInLabels[labelChordPair[0]][chord]++;
      } else {
        chordCountsInLabels[labelChordPair[0]][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;

  Object.keys(probabilityOfChordsInLabels).forEach(label => {
    Object.keys(probabilityOfChordsInLabels[label]).forEach( chords => {
      let chance = probabilityOfChordsInLabels[label][chords] * 1.0 / songs.length;
      probabilityOfChordsInLabels[label][chords] = chance;
    });
  });
}

train(imagine, 'easy');
train(somewhere_over_the_rainbow, 'easy');
train(tooManyCooks, 'easy');
train(iWillFollowYouIntoTheDark, 'medium');
train(babyOneMoreTime, 'medium');
train(creep, 'medium');
train(paperBag, 'hard');
train(toxic, 'hard');
train(bulletproof, 'hard');

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

function classify(chords) {
  var ttal = labelProbabilities;
  console.log(ttal);

  var classified = {};

  Object.keys(ttal).forEach(obj => {
    var first = labelProbabilities[obj] + 1.01;
    chords.forEach(chord => {
      var probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];
      if (probabilityOfChordInLabel === undefined) {
        first + 1.01;
      } else {
        first = first * (probabilityOfChordInLabel + 1.01);
      }
    });

    classified[obj] = first;
  });

  console.log(classified);
};

classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
