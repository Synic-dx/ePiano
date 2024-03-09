// selecting piano keys using their ids
const C3 = document.querySelector('#C3');
const Db3 = document.querySelector('#Db3');
const D3 = document.querySelector('#D3');
const Eb3 = document.querySelector('#Eb3');
const E3 = document.querySelector('#E3');
const F3 = document.querySelector('#F3');
const Gb3 = document.querySelector('#Gb3');
const G3 = document.querySelector('#G3');
const Ab3 = document.querySelector('#Ab3');
const A3 = document.querySelector('#A3');
const Bb3 = document.querySelector('#Bb3');
const B3 = document.querySelector('#B3');
const C4 = document.querySelector('#C4');
const Db4 = document.querySelector('#Db4');
const D4 = document.querySelector('#D4');
const Eb4 = document.querySelector('#Eb4');
const E4 = document.querySelector('#E4');
const F4 = document.querySelector('#F4');
const Gb4 = document.querySelector('#Gb4');
const G4 = document.querySelector('#G4');
const Ab4 = document.querySelector('#Ab4');
const A4 = document.querySelector('#A4');
const Bb4 = document.querySelector('#Bb4');
const B4 = document.querySelector('#B4');
const C5 = document.querySelector('#C5');
const Db5 = document.querySelector('#Db5');
const D5 = document.querySelector('#D5');
const Eb5 = document.querySelector('#Eb5');
const E5 = document.querySelector('#E5');
const F5 = document.querySelector('#F5');
const Gb5 = document.querySelector('#Gb5');
const G5 = document.querySelector('#G5');
const Ab5 = document.querySelector('#Ab5');
const A5 = document.querySelector('#A5');
const Bb5 = document.querySelector('#Bb5');
const B5 = document.querySelector('#B5');
const C6 = document.querySelector('#C6');

let noteDirectory = 'notes';

function playNote(note) {
  audioFiles[note].play();
  audioFiles[note].onended = function () {
    audioFiles[note].currentTime = 0;
  };
}

// onlclicks
C3.onclick = function() { playNote('C3') };
Db3.onclick = function() { playNote('Db3') };
D3.onclick = function() { playNote('D3') };
Eb3.onclick = function() { playNote('Eb3') };
E3.onclick = function() { playNote('E3') };
F3.onclick = function() { playNote('F3') };
Gb3.onclick = function() { playNote('Gb3') };
G3.onclick = function() { playNote('G3') };
Ab3.onclick = function() { playNote('Ab3') };
A3.onclick = function() { playNote('A3') };
Bb3.onclick = function() { playNote('Bb3') };
B3.onclick = function() { playNote('B3') };
C4.onclick = function() { playNote('C4') };
Db4.onclick = function() { playNote('Db4') };
D4.onclick = function() { playNote('D4') };
Eb4.onclick = function() { playNote('Eb4') };
E4.onclick = function() { playNote('E4') };
F4.onclick = function() { playNote('F4') };
Gb4.onclick = function() { playNote('Gb4') };
G4.onclick = function() { playNote('G4') };
Ab4.onclick = function() { playNote('Ab4') };
A4.onclick = function() { playNote('A4') };
Bb4.onclick = function() { playNote('Bb4') };
B4.onclick = function() { playNote('B4') };
C5.onclick = function() { playNote('C5') };
Db5.onclick = function() { playNote('Db5') };
D5.onclick = function() { playNote('D5') };
Eb5.onclick = function() { playNote('Eb5') };
E5.onclick = function() { playNote('E5') };
F5.onclick = function() { playNote('F5') };
Gb5.onclick = function() { playNote('Gb5') };
G5.onclick = function() { playNote('G5') };
Ab5.onclick = function() { playNote('Ab5') };
A5.onclick = function() { playNote('A5') };
Bb5.onclick = function() { playNote('Bb5') };
B5.onclick = function() { playNote('B5') };
C6.onclick = function() { playNote('C6') };

// keyboard
const keyMappings = {
  'q': 'C3',
  '2': 'Db3',
  'w': 'D3',
  '3': 'Eb3',
  'e': 'E3',
  'r': 'F3',
  '5': 'Gb3',
  't': 'G3',
  '6': 'Ab3',
  'y': 'A3',
  '7': 'Bb3',
  'u': 'B3',
    'z': 'C4',
    's': 'Db4',
    'x': 'D4',
    'd': 'Eb4',
    'c': 'E4',
    'v': 'F4',
    'g': 'Gb4',
    'b': 'G4',
    'h': 'Ab4',
    'n': 'A4',
    'j': 'Bb4',
    'm': 'B4',
    ',': 'C5',

    'l': 'Db5',
    '.': 'D5',
    ';': 'Eb5',
    '/': 'E5',
    'o': 'F5',
    '0': 'Gb5',
    'p': 'G5',
    '-': 'Ab5',
    '[': 'A5',
    '=': 'Bb5',
    ']': 'B5',

    '\u005C': 'C6'
};

noteDisplay = document.querySelector('#noteDisplay');

document.body.addEventListener('keydown', function(e) {
    const key = e.key;
    if (keyMappings[key]) {
      let pianoKey = document.querySelector('#' + keyMappings[key]);
      pianoKey.classList.add('pressed');
      playNote(keyMappings[key]);
      noteDisplay.innerText = keyMappings[key]; // noteDisplay text
    }
});
  
document.body.addEventListener('keyup', function(e) {
    const key = e.key.toLowerCase();
    if (keyMappings[key]) {
      let pianoKey = document.querySelector('#' + keyMappings[key]);
      pianoKey.classList.remove('pressed');
    }
});

//fixing lag

const noteNames = ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3',
  'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4',
  'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5',
  'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6'];

const audioFiles = {};

for (const note of noteNames) {
  audioFiles[note] = new Audio(`notes/${note}.mp3`);
  audioFiles[note].preload = 'auto';
}