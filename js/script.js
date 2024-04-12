window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  // function handleKeydown(event) {
  //   console.log("handle keydown called");
  //   const key = event.key;
  //   const possibleKeyStrokes = [
  //     "ArrowLeft",
  //     "ArrowRight",
  //     // "ArrowUp",
  //     // "ArrowDown",
  //   ];
  //   console.group(key);
  //   if (possibleKeyStrokes.includes(key)) {
  //     event.preventDefault();
  //     switch (key) {
  //       case "ArrowLeft":
  //         game.player.directionX = -1;
  //         console.log(game.player.directionX);
  //         break;
  //       // case "ArrowUp":
  //       //   game.player.directionY = -1;
  //       //   console.log(game.player.directionY);
  //       //   break;
  //       case "ArrowRight":
  //         game.player.directionX = 1;
  //         console.log(game.player.directionX);
  //         break;
  //       // case "ArrowDown":
  //       //   game.player.directionY = 1;
  //       //   console.log(game.player.directionY);
  //       //   break;
  //     }
  //   }
  // }
  let isJumping = false;
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    event.preventDefault();
    if (event.code === "Space" && !isJumping) {
      isJumping = true;
      game.player.jump();
      isJumping = false;
      // game.player.directionY = -10;

      console.log("space");
    }

    switch (key) {
      case "ArrowLeft":
        game.player.directionX = -5;
        console.log(game.player.directionX);
        break;
      // case "ArrowUp":
      //   game.player.directionY = -1;
      //   console.log(game.player.directionY);
      //   break;
      case "ArrowRight":
        game.player.directionX = 1;
        console.log(game.player.directionX);
        break;
      // case "ArrowDown":
      //   game.player.directionY = 1;
      //   console.log(game.player.directionY);
      //   break;
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key;
    // Reset direction when the left or right key is released
    if (key === "ArrowLeft" || key === "ArrowRight") {
      game.player.directionX = 0;
    }
  });

  //window.addEventListener("keydown", handleKeydown);

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
