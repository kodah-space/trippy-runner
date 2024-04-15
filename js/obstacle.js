class Obstacle {
  // create obstacle with passed vales and default settings
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 1940;
    this.top = 700;
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
    // Move the obstacle left by 6px
    this.left -= 6;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
