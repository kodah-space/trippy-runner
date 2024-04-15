window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  // Event listener for click of start button
  startButton.addEventListener("click", function () {
    startGame();
  });

  // function to start the game -> called when start button is clicked
  function startGame() {
    game = new Game();
    game.start();
  }

  let isJumping = false;

  // Listens for arrow key clicks and space and either jumps or moves left or right
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    event.preventDefault();
    if (event.code === "Space" && !isJumping) {
      isJumping = true;
      game.player.jump();
      isJumping = false;
      console.log("space");
    }

    switch (key) {
      case "ArrowLeft":
        game.player.directionX = -5;
        console.log(game.player.directionX);
        break;
      case "ArrowRight":
        game.player.directionX = 5;
        console.log(game.player.directionX);
        break;
    }
  });
  // when key released player should stop moving
  window.addEventListener("keyup", (event) => {
    const key = event.key;
    // Reset direction when the left or right key is released
    if (key === "ArrowLeft" || key === "ArrowRight") {
      game.player.directionX = 0;
    }
  });

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
