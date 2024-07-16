// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let vowels = ["A", "E", "I", "O", "U"];



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
   console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   //oldScrabbleScorer(word);
   return word;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word){
   word2 = word.toUpperCase();
       let letterPoints = word2.length;
       console.log(`Score for '${word}':  ${letterPoints}`);
       return letterPoints;
};

let vowelBonusScorer = function(word) {
   word2 = word.toUpperCase().split('');
   let letterPoints = 0;
   for (i = 0; i < word.length; i++){
      if (vowels.includes(word2[i])) {
         letterPoints = letterPoints + 3;
      } else {
         letterPoints = letterPoints + 1;
      }
   }
   console.log(`Score for '${word}':  ${letterPoints}`);
   return letterPoints;
};

let scrabbleScorer = function(word){
   word2 = word.toLowerCase().split('');
   letterPoints = 0;
   for (i = 0; i < word.length; i++){
      if (Object.keys(newPointStructure).includes(word2[i])){
         let numPoints = Number(newPointStructure[word2[i]]);
         letterPoints += numPoints;
      }
   }
   console.log(`Score for '${word}':  ${letterPoints}`);
   return letterPoints;
};

const scoringAlgorithms = [
   simple = {
      name: "SimpleScore",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   vowelBonus = {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   }, 
   scrabble = {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log(`Which scoring algorithm would you like to use?\n 
      0 - Simple: Each letter is worth 1 pt.
      1 - Vowel Bonus: Vowels are 3 pts, consonants are 1 pt.
      2 - Scrabble: Uses traditional Scrabble algorithm.\n`);
      let userInput = input.question(`Enter 0, 1, or 2: `);
      return scoringAlgorithms[userInput].scorerFunction(word);
}

function transform(object) {
   let newObj = {};
   for (let item in object) {
      for (i = 0; i < object[item].length; i++) {
         newObj[object[item][i].toLowerCase()] = Number(item);
      }
   }
   return newObj;
};

function runProgram() {
   return scorerPrompt(initialPrompt());
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
