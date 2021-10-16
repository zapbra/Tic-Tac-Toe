window.onload = () => {
  // Variables
  const squares = document.querySelectorAll(".game-square");
  const resetButton = document.querySelector("#reset");
  const winScreen = document.querySelector(".win-screen");
  class Player {
    constructor(turn) {
      this.turn = turn;
    }
  }

  const player = new Player(true);

  // Functions

  function resetGame() {
    squares.forEach((square) => {
      square.innerText = "";
      square.classList.add("hover-state");
    });
    player.turn = true;

    if (winScreen.classList.contains("place-win-middle")) {
      winScreen.classList.remove("place-win-middle");
    }
  }

  function displayWinner(winner) {
    const winnerText = document.querySelector("#actual-winner-text");
    if (winner == "x") {
      winnerText.innerText = "You Win!";
    } else {
      winnerText.innerText = "You Lose!";
    }
    winScreen.classList.add("place-win-middle");
  }

  function setHoverState(condition) {
    if (condition == true) {
      squares.forEach((square) => {
        if (square.innerText == "") {
          square.classList.add("hover-state");
        }
      });
    } else {
      squares.forEach((square) => {
        square.classList.remove("hover-state");
      });
    }
  }

  function checkWin() {
    let sqOne, sqTwo, sqThree, sqFour, sqFive, sqSix, sqSeven, sqEight, sqNine;
    let winState = false;
    [sqOne, sqTwo, sqThree, sqFour, sqFive, sqSix, sqSeven, sqEight, sqNine] = [
      ...squares,
    ].map((square) => {
      return square.innerText;
    });

    if (sqOne == sqTwo && sqOne == sqThree && sqOne != "") {
      return sqOne;
    }
    if (sqOne == sqFive && sqOne == sqNine && sqOne != "") {
      return sqOne;
    }
    if (sqOne == sqFour && sqOne == sqSeven && sqOne != "") {
      return sqOne;
    }

    if (sqTwo == sqFive && sqTwo == sqEight && sqTwo != "") {
      return sqTwo;
    }

    if (sqThree == sqSix && sqThree == sqNine && sqThree != "") {
      return sqThree;
    }

    if (sqThree == sqFive && sqThree == sqSeven && sqThree != "") {
      return sqThree;
    }

    if (sqFour == sqFive && sqFour == sqSix && sqFour != "") {
      return sqFour;
    }
    if (sqSeven == sqEight && sqSeven == sqNine && sqSeven != "") {
      return sqSeven;
    }
  }

  function robotTurn() {
    const emptySquares = [...squares].filter((square) => {
      return square.innerText == "";
    });

    const randomNumber = Math.floor(Math.random() * emptySquares.length);
    emptySquares[randomNumber].innerText = "o";

    let winner = checkWin();
    if (winner == "o") {
      displayWinner(winner);
    }
    player.turn = true;
    setHoverState(true);
  }

  function displayLetter(square) {
    square.innerText = "x";
    let winner = checkWin();

    if (winner == "x") {
      displayWinner(winner);
      return true;
    }
  }

  function checkTaken(e) {
    // Check if square is empty
    if (player.turn == true) {
      // If select empty block
      if (e.currentTarget.innerText == "") {
        player.turn = false;
        // displays letter and returns true if win
        if (displayLetter(e.currentTarget)) {
        } else {
          setTimeout(robotTurn, 1000);
        }
        // Add check win here and remove from other
        setHoverState(false);
      }
    }
  }

  // Event Listeners

  squares.forEach((square) => {
    square.addEventListener("click", checkTaken);
  });

  reset.addEventListener("click", resetGame);
};
