class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // this.left = Math.floor(Math.random() * 300 + 70);
    this.left = 800;
    this.top = 380;
    this.width = 100;
    this.height = 100;
    this.element = document.createElement("img");

    this.element.src = "./images/character/cop.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle down by 3px
    this.left -= 1;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

// class Obstacle {
//   constructor(gameScreen, gapHeight, endScreenDistance, obstacleType) {
//     this.gameScreen = gameScreen;
//     this.left = gameScreen.offsetWidth + endScreenDistance;
//     this.top = gameScreen.offsetHeight - gapHeight;

//     // this.left = 800;
//     // this.top = 380;
//     this.width = 100;
//     this.height = 100;
//     this.element = document.createElement("img");

//     this.element.src = "./images/character/cop.png";

//     this.element = document.createElement("div");
//     this.element.className = obstacleType;

//     this.element.style.top = `${this.top}px`;
//     this.element.style.left = `${this.left}px`;

//     this.gameScreen.appendChild(this.element);
//   }

//   move(speed) {
//     // Move the obstacle
//     this.left -= speed;
//     // Update the obstacle's position on the screen
//     this.updatePosition();
//   }

//   updatePosition() {
//     this.element.style.left = `${this.left}px`;
//   }

//   isOutOfScreen() {
//     return this.left + this.width < 0;
//   }

//   collidedWithPlayer(player) {
//     const playerRect = player.element.getBoundingClientRect();
//     const obstacleRect = this.element.getBoundingClientRect();

//     if (
//       playerRect.left < obstacleRect.right &&
//       playerRect.right > obstacleRect.left &&
//       playerRect.top < obstacleRect.bottom &&
//       playerRect.bottom > obstacleRect.top
//     ) {
//       return true; // Collision detected
//     }

//     return false; // No collision
//   }
// }
