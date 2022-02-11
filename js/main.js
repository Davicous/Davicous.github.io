document.addEventListener("DOMContentLoaded", () => {
	
	const modal_container = document.getElementById("modal_container");
	const share = document.getElementById("share");
	
	const startDate = new Date("02/01/2022");
	
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
	"doggy",
	"pepis",
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
  ];
  
	createSquares();
	//getNewWord();

	let guessedWords = [[]];
	let availableSpace = 1;

	let word = "dumpy";
	let dayNumber = "5";
	let guessedWordCount = 0;

	let score = "Word # #/1\n 🟩🟩🟩🟩🟩";
	let emojiArrangement = "🟩🟩🟩🟨🟨";
	
	dayNumber = getNumberOfDays();
	word = words[(parseInt(dayNumber) - 1) % words.length];
	
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

	share.onclick = () => {
		navigator.clipboard.writeText(score);
		window.alert("Copied to clipboard!");
	};

  const keys = document.querySelectorAll(".keyboard-row button");
  
  document.getElementById("button1").innerHTML = word.charAt(0);
  document.getElementById("button2").innerHTML = word.charAt(1);
  document.getElementById("button3").innerHTML = word.charAt(2);
  document.getElementById("button4").innerHTML = word.charAt(3);
  document.getElementById("button5").innerHTML = word.charAt(4);
  
  for (let i = 1; i < keys.length; i++) {
      keys[i].setAttribute("data-key", word.charAt(i - 1));
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

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
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
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
	  return;
    }
	
	const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
	emojiArrangement = "";
	currentWordArr.forEach((letter, index) => {
	  setTimeout(() => {
		const tileColor = getTileColor(letter, index);
		emojiArrangement += getEmojiColor(letter, index);

		const letterId = firstLetterId + index;
		const letterEl = document.getElementById(letterId);
		letterEl.classList.add("animate__flipInX");
		letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
	  }, interval * index);
	});
	
	setTimeout(() => {
		const currentWord = currentWordArr.join("");
		
		if(currentWord === word) {
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
		
	}, interval * 6);
	
	guessedWordCount += 1;
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 5; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }
  
  function shareScore() {
	  score.select();
	  score.setSelectRange(0, 99999);
	  
	  navigator.clipboard.writeText(score.value);
	  
	  window.alert("Copied to clipboard!");
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
});
