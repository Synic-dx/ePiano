// Selecting piano keys using their ids
let keys = ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3','Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4','B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5','Ab5', 'A5', 'Bb5', 'B5', 'C6'];
let pianoKeys = {};
keys.forEach(function(key){
    pianoKeys[key] = document.querySelector('#'+key);
});

let noteDirectory = 'notes';

// Playing the note (at max volume)
function playNote(note) {
  let audio = audioFiles[note].cloneNode(true);  // Clone Audio object

  audio.volume = 1.0;
  audio.play();
  
  audio.onended = function () {
    audio.currentTime = 0;
  };
}

//Pressed animation defining and mousedown/up calling in
function addPressed(key) {
  key.classList.add('pressed');
}

function removePressed(key) {
  key.classList.remove('pressed');
}

// mouse
keys.forEach(function(key){
  keys.forEach(function(key){
    pianoKeys[key].onmousedown = function(){
      playNote(key);
      addPressed(this);
      noteDisplay.innerText = key; //fixed mouse note Display error
    };
  
    pianoKeys[key].onmouseup = function(){
      removePressed(this);
    };
  });

  pianoKeys[key].onmouseout = function(){
    removePressed(this);
  };
});

// Keyboard handling
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
  '\u005C': 'C6',
};

let noteDisplay = document.querySelector('#noteDisplay');
let originalText = noteDisplay.innerText;
const pressedKeys = {}; //fixed bell ringing issue
let loaded = false;

document.body.addEventListener('keydown', function(e) {
  if (loaded === true){
    const key = e.key.toLowerCase();
    if(key === ' ') {    // linking spacebar with notedisplay
      noteDisplay.click();
    }
    if (keyMappings[key] && !pressedKeys[key]) {
      let pianoKey = pianoKeys[keyMappings[key]];
      addPressed(pianoKey);
      playNote(keyMappings[key]);
      noteDisplay.innerText = keyMappings[key];
      pressedKeys[key] = true;
    }
  } else {
    alert('ePiano is loading');
  }
});

document.body.addEventListener('keyup', function(e) {
  const key = e.key.toLowerCase();
  if (keyMappings[key]) {
    let pianoKey = pianoKeys[keyMappings[key]];
    removePressed(pianoKey);
    pressedKeys[key] = false;
  }
});

//Audio file linking
const noteNames = ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6'];
let audioFiles = {};

//audio preloading
async function preloadAudio(url) {
  const audio = new Audio();
  
  const load = async () => {
    return new Promise((resolve, reject) => {
      audio.src = url;
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = reject;
    });
  };
  
  await load();
  return audio;
}

async function loadAudioFiles() {
  let notePromises = noteNames.map(note => preloadAudio(`notes/${note}.mp3`));
  let audios = await Promise.all(notePromises);
  
  for(let i = 0; i < noteNames.length; i++) {
    audioFiles[noteNames[i]] = audios[i];
  }
}

// Note Names to keys
document.addEventListener("DOMContentLoaded", function() {
  noteDisplay.innerText = "Loading...";
  
  let keys = document.querySelectorAll(".keys div");
  keys.forEach(function(key) {
    let span = key.querySelector("span");
    span.textContent = key.id;
  });
  
  // load when page is ready
  loadAudioFiles().then(() => {
    noteDisplay.innerText = originalText;
    loaded = true;
  });
});

//Toggle Note Display
noteDisplay.addEventListener('click', function() {
  const noteElements = document.querySelectorAll('.note');

  noteElements.forEach((element) => {
      element.classList.toggle('hidden');
  });
});

noteDisplay.addEventListener('mouseenter', function() {
    originalText = noteDisplay.innerText;
    noteDisplay.innerText = "Toggle Key Notes";
    noteDisplay.style.fontSize = "1.1rem";
});

noteDisplay.addEventListener('mouseleave', function() {
    noteDisplay.innerText = originalText;
    noteDisplay.style.fontSize = "1.3rem";
});