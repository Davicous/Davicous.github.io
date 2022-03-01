document.addEventListener("DOMContentLoaded", () => {
	
	const words = [
	"jolly",
	"silly",
	"dumpy",
	"poggy",
	"thicc",
	"frgor",
	"bussy",
	"zordy",
	"snarf",
	"cream",
	"moist",
	"  no",
	"bruh",
	"burgr",
	"bark!",
	"meow!",
	" sus ",
	"lmfao",
	"doggington",
	"hi mara! :)",
	"brooke mega cute",
	"snarflet",
	"antidisestablishmentarianism",
	"chonkster",
	"noot noot",
	"craving cookout",
	"egg",
	"eep",
	"hippomonstrosesquippedaliophobia",
	"perchance.",
	"icecream",
	"hot choccy",
	"i'm really hungry rn",
	"pump it up kitty",
	"just pump it up kitty cat",
	"where ya at?",
	"there ya go!",
	"somebody once told me",
	"the world was gunna roll me",
	"i aint the sharpest tool",
	"in the sheeed",
	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhh!!!",
	"boingy boing",
	"pizza gude",
	"nyehehehehe",
	"ope",
	"i need help",
	"work sucks",
	"someone save me from this madness",
	"dabberino",
	"hi",
	"super sussy baka",
	"wahhhhh",
	"excessive internal crying",
	"5 more minutes please",
	"uwu",
	"i miss my friends",
	"burger king foot lettuce",
	":3",
	"                                                         ",
	"x   x x x   x   x x x   x",
	"plopeyes",
	":(",
	"life is very hard sometimes",
	"i believe in you",
	"you matter",
	"how long can i make this before it's impossible to press any of the buttons because they are too small?",
	"i feel uncreative at this point",
	"wiggly jiggly",
	"",
	"im tired :(",
	"depression is very real",
	"we'll be ok",
	"bonky",
	"wowza",
	"prank",
	"choco",
	"thigh",
	"booba",
	"crunk",
	"busty",
	"mlems",
	"boops",
	"sussy",
	"baka",
	"pepis",
  ];

	const modal_container = document.getElementById("modal_container");
	const share = document.getElementById("share");
	share.onclick = () => {
		navigator.clipboard.writeText(score);
		window.alert("Copied to clipboard!");
	};
	
	const keys = document.querySelectorAll(".keyboard-row button");
	
	const startDate = new Date("02/01/2022");
	
	let dayNumber = getNumberOfDays();
	let word = words[(parseInt(dayNumber) - 1) % words.length];
	let wordLength = word.length;
	let guessedWord = "";

	let score = "Word # #/1\n 🟩🟩🟩🟩🟩";
	let emojiArrangement = "";
	
	const motMessages = [
	"You got the word! You're truly amazing! :) ",
	"You rock! Keep being you and keep being awesome! B) ",
	`You're ${word}er than ${word}! You're the ${word}est of all ${word}s!`,
	"Look at you go, you lil word wizard! UwU",
	"Heck yeah! You're a heckin boss! B) ",
	"You're killin it, bruv! Show the world who's boss!!!",
	"Literally in awe of your greatness! Woo!",
	"You're the master of words, and I'm your biggest fan!",
	"You matter. You're doing great! Keep on keeping on!",
	"I hope you have an awesome day or night, wherever you are! :) ",
	`This one goes out to you! This one's for the person who got the word ${word}!`,
	"You just light up the room. :) ",
	"You make the world a better place! :D",
	"You are incredibly stunning! Keep it up!! :) ",
	"I'm glad you're here, and so are many other people! :3",
	`You may not be ${word}y, but you sure are amazing!`,
	"The world is much more colorful with you in it!",
	"You're rad! I want more people to be like you!",
  ];
	
	createKeyboardButtons();
	createSquares();
  
  function createKeyboardButtons() {
	  var element = document.getElementById("keyboard_row");
	  
	  var enterKey = document.createElement("button");
	  enterKey.innerHTML = "ENTER";
	  //enterKey.setAttribute("data-key", "enter");
	  enterKey.classList.add("wide-button");
	  enterKey.onclick = handleSubmitWord;
	  
	  element.appendChild(enterKey);
	  
	  for (let i = 0; i < wordLength; i++){
		  var newKey = document.createElement("button");
		  newKey.innerHTML = word.charAt(i);
		  newKey.setAttribute("data-key", word.charAt(i));
		  
		  newKey.onclick = ({ target }) => {
		  const letter = target.getAttribute("data-key");
		  
		  if (guessedWord.length < wordLength){
			  guessedWord += letter;
			  updateGuessedWord(letter);
		  }
		};
		  
		  element.appendChild(newKey);
	  }
	  
	  var deleteKey = document.createElement("button");
	  deleteKey.innerHTML = "DEL";
	  //deleteKey.setAttribute("data-key", "del");
	  deleteKey.classList.add("wide-button");
	  deleteKey.onclick = handleDeleteLetter;
	  
	  element.appendChild(deleteKey);
  }
  
  function getFormattedDate(date) {
	var formattedDateString = date.getMonth() + 1;
	formattedDateString += "/";
	formattedDateString += date.getDate();
	formattedDateString += "/";
	formattedDateString += date.getFullYear();
	return formattedDateString;
}
  
  function getNumberOfDays() {
	var today = new Date();
	var formattedToday = new Date(getFormattedDate(today));
	
	var differenceInTime = formattedToday.getTime() - startDate.getTime();
	var differenceInDays = differenceInTime / (1000 * 3600 * 24);
	
	return differenceInDays;
  }

  function getEmojiColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "⬛";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "🟩";
    }

    return "🟨";
  }
  
  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function handleSubmitWord() {
    if (guessedWord.length !== wordLength) {
      window.alert(`Word must be ${wordLength} letters`);
	  return;
    }
	
    const interval = 200;
	
	for (let i = 0; i < wordLength; i++){
		setTimeout(() => {
			const tileColor = getTileColor(guessedWord.charAt(i), i);
			emojiArrangement += getEmojiColor(guessedWord.charAt(i), i);
			const letterEl = document.getElementById(i + 1);
			letterEl.classList.add("animate__flipInX");
			letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
		}, interval * i);
	}
	
	setTimeout(() => {
		if(guessedWord === word) {
			score = `Word ${dayNumber} 1/1\n`;
			score += emojiArrangement;
			score += "\nhttps://davicous.github.io/";
			document.getElementById("game_result_word").innerHTML = `Yay! The word was ${word}!`;
			document.getElementById("game_result").innerHTML = motMessages[Math.floor(Math.random()*motMessages.length)];
		}
		else {
			score = `Word ${dayNumber} 0/1\n`;
			score += emojiArrangement;
			score += "\nhttps://davicous.github.io/";
			document.getElementById("game_result_word").innerHTML = "Whoops!";
			document.getElementById("game_result").innerHTML = `Exuse me! The word was ${word}, silly! :D`;
		}
		
		modal_container.classList.add('show');
		
	}, interval * (wordLength + 1));
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < wordLength; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const lastLetterEl = document.getElementById(String(guessedWord.length));

    lastLetterEl.textContent = "";
	
	guessedWord = guessedWord.slice(0, -1);
  }
  
  function shareScore() {
	  score.select();
	  score.setSelectRange(0, 99999);
	  
	  navigator.clipboard.writeText(score.value);
	  
	  window.alert("Copied to clipboard!");
  }

  function updateGuessedWord(letter) {
	  const availableSpaceEl = document.getElementById(String(guessedWord.length));

	  availableSpaceEl.textContent = letter;
  }
});
