document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Carreguei");

  const boardGameHtml = Array.from(
    document.querySelectorAll(".tabuleiroJogoBox")
  );
  const restarBtn = document.getElementById("restartBtn");
  let boardX = document.getElementById("placarAtualX");
  let boardO = document.getElementById("placarAtualO");
  let endGameScreen = document.getElementById("endGame");
  let tryAgainBtn = document.getElementById("buttonTryAgain");
  let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winningBlocks')

  var player = "X";
  let playerTurn = document.getElementById("controladorTurn");
  var winnerMessage = document.getElementById("mensagemVencedor");
  let clicked = Array(9).fill("");
  const winningCombinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function ifYouWon() {
    let winner = false;
    let winnerMessage = document.getElementById("messageEndGame");
    let hasWon = false;

    winningCombinations.forEach(function (content) {
      if (!hasWon) {
        const pos1 = content[0];
        const pos2 = content[1];
        const pos3 = content[2];

        if (clicked[pos1] == "" || clicked[pos2] == "" || clicked[pos3] == "") {
          return;
        }
        if (clicked[pos1] == clicked[pos2] && clicked[pos1] == clicked[pos3]) {
          winner = true;
          endGameScreen.classList.add("showEndGame");
          winnerMessage.innerText = `Player ${player} won the game!`;
          content.map(box => boardGameHtml[box].style.backgroundColor = winnerIndicator)

          let placar = document.getElementById(`placarAtual${player}`);
          if (placar.innerText == "-") {
            placar.innerText = 1;
          } else {
            placar.innerText = parseInt(placar.innerText) + 1;
          }
          hasWon = true;
        }
      }
    });

    if (!clicked.includes("") && !hasWon) {
      endGameScreen.classList.add("showEndGame");
      winnerMessage.innerText = `It's a draw!`;
    }

    return winner;
  }

  function selectBox(boardGameBox, posClicked) {
    if (clicked[posClicked] == "") {
      clicked[posClicked] = player;
      boardGameBox.innerText = player;

      const result = ifYouWon();
      if (result == true) return;
      if (player == "X") player = "O";
      else player = "X";

      playerTurn.innerText = `Vez de ${player}`;
      console.log(clicked);
    }
  }

  function restartGame() {
    console.log("Reiniciar");
    boardGameHtml.forEach(function (boardGameBox) {
      boardGameBox.innerText = ""
      boardGameBox.style.backgroundColor = ''
    });
    clicked = Array(9).fill("");
    playerTurn.innerText = "Vez de X";
    player = "X";
    boardX.innerText = "-";
    boardO.innerText = "-";
    endGameScreen.classList.remove("showEndGame");
  }

  function tryAgain() {
    boardGameHtml.forEach(function (boardGameBox) {
      boardGameBox.innerText = ""
      boardGameBox.style.backgroundColor = ''
    });
    clicked = Array(9).fill("");
    playerTurn.innerText = "Vez de X"
    player = "X"
    endGameScreen.classList.remove("showEndGame");
  }

  boardGameHtml.forEach(function (boardGameBox, posClicked) {
    boardGameBox.addEventListener("click", function () {
      selectBox(boardGameBox, posClicked);
    });
  });

  restarBtn.addEventListener("click", restartGame);

  tryAgainBtn.addEventListener("click", tryAgain);
});
