class Game {
  //constructor with initial settings of the game
  constructor() {
    this.startScreen = document.getElementById("game-intro-background");
    this.scoreCard = document.getElementById("score-card");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      10,
      200,
      80,
      80,
      "./images/character/Run(1).png"
    );
    this.lastObstacleCreationTime = 0;
    this.lastGoodleCreationTime = 0;
    this.height = 1080;
    this.width = 1920;
    this.obstacles = [];
    this.goodies = [];
    this.shroomScore = 0;
    this.sunShineScore = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.scoreCard.style.display = "none";
  }

  // on calling this function, intro screen is hidden and game screen starts
  start() {
    console.log(this.gameScreen);
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.scoreCard.style.display = "block";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  // constant loop listener which will render the game and manage all updates
  gameLoop() {
    this.update();

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    // Check for collision and if an goodies is still on the screen
    for (let i = 0; i < this.goodies.length; i++) {
      const goodie = this.goodies[i];
      goodie.move();

      // If the player collides with an goodies
      if (this.player.didCollide(goodie)) {
        // Remove the goodies element from the DOM
        goodie.element.remove();
        // Remove goodies object from the array

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
        // Remove the goodies from the DOM
        goodie.element.remove();
        // Remove goodies object from the array
        this.goodies.splice(i, 1);
        // Update the counter variable to account for the removed goodies
        i--;
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // If the player'collides with an obstacle
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
    // have a minimum time pass before a new obstacle is created
    if (Math.random() > 0.98 && this.obstacles.length < 1000) {
      const currentTime = Date.now();
      const creationDelay = Math.floor(Math.random() * (2500 - 1000 + 1) + 800);
      if (currentTime - this.lastObstacleCreationTime > creationDelay) {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.lastObstacleCreationTime = currentTime; // Update the last creation time
      }
    }

    // Create a new goodie based on a random probability
    // have a minimum time pass before a new goodie is created
    if (Math.random() > 0.7 && this.goodies.length < 100) {
      const currentGTime = Date.now();
      const creationGDelay = Math.floor(
        Math.random() * (2500 - 1000 + 1) + 800
      );
      // randomly create different type of goodies
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

    this.scoreCard.style.display = "block";
  }

  // update counts for the score card
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
