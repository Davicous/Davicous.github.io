document.addEventListener("DOMContentLoaded", () => {
  createSquares();
  //getNewWord();

  let guessedWords = [[]];
  let availableSpace = 1;

  let word = "beans";
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");
  
  document.getElementById("button1").innerHTML = word.charAt(0);
  document.getElementById("button2").innerHTML = word.charAt(1);
  document.getElementById("button3").innerHTML = word.charAt(2);
  document.getElementById("button4").innerHTML = word.charAt(3);
  document.getElementById("button5").innerHTML = word.charAt(4);
  
  for (let i = 1; i < keys.length; i++) {
      keys[i].setAttribute("data-key", word.charAt(i - 1));
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
	currentWordArr.forEach((letter, index) => {
	  setTimeout(() => {
		const tileColor = getTileColor(letter, index);

		const letterId = firstLetterId + index;
		const letterEl = document.getElementById(letterId);
		letterEl.classList.add("animate__flipInX");
		letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
	  }, interval * index);
	});
	
	setTimeout(() => {
		const currentWord = currentWordArr.join("");
	
		if(currentWord === word) {
			window.alert(`Yay! ${word}!`);
		}
		else {
			window.alert(`Excuse me! The word is ${word}, silly!`);
		}
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
