class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      10,
      250,
      80,
      80,
      "./images/character/Run(1).png"
    );
    this.lastObstacleCreationTime = 0;
    this.lastGoodleCreationTime = 0;
    this.height = 600;
    this.width = 800;
    this.obstacles = [];
    this.goodies = [];
    this.shroomScore = 0;
    this.sunShineScore = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }
  start() {
    console.log(this.gameScreen);
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";

    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.goodies.length; i++) {
      const goodie = this.goodies[i];
      goodie.move();

      // If the player's car collides with an obstacle
      if (this.player.didCollide(goodie)) {
        // Remove the obstacle element from the DOM
        goodie.element.remove();
        // Remove obstacle object from the array
        //this.goodie.splice(i, 1);
        // Reduce player's lives by 1
        if (this.goodies[i].type == "shroom") {
          this.shroomScore++;
        } else if (this.goodies[i].type == "sunshine") {
          this.sunShineScore++;
        }

        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (goodie.top > this.height) {
        // Increase the score by 1
        this.score++;
        // Remove the obstacle from the DOM
        goodie.element.remove();
        // Remove obstacle object from the array
        this.goodies.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {
        // Increase the score by 1
        //this.score++;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }
    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 100) {
      const currentTime = Date.now();
      const creationDelay = Math.floor(Math.random() * (2500 - 1000 + 1) + 800);
      if (currentTime - this.lastObstacleCreationTime > creationDelay) {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.lastObstacleCreationTime = currentTime; // Update the last creation time
      }
    }

    if (Math.random() > 0.7 && this.goodies.length < 100) {
      const currentGTime = Date.now();
      const creationGDelay = Math.floor(
        Math.random() * (2500 - 1000 + 1) + 800
      );

      let typeOptions = ["shroom", "sunshine"];

      if (currentGTime - this.lastGoodleCreationTime > creationGDelay) {
        let selectedType = Math.floor(Math.random() * typeOptions.length);
        if (selectedType == 0) {
          this.goodies.push(new Sunshine(this.gameScreen, selectedType));
        } else if (selectedType == 1) {
          this.goodies.push(new Shroom(this.gameScreen, selectedType));
        }
        this.lastGoodleCreationTime = currentGTime; // Update the last creation time
        console.log(this.goodies);
      }
    }
    this.updateLivesDisplay();
    this.updateShroomDisplay();
    this.updateSunShineDisplay();
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.goodies.forEach((goodie) => goodie.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }

  updateLivesDisplay() {
    const livesElement = document.getElementById("lives");
    livesElement.textContent = this.lives;
  }

  updateShroomDisplay() {
    const shroomElement = document.getElementById("shroomScore");
    shroomElement.textContent = this.shroomScore;
  }

  updateSunShineDisplay() {
    const sunshineElement = document.getElementById("stamnpScore");
    sunshineElement.textContent = this.sunShineScore;
  }
}
