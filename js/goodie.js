class Goodie {
  // create goodies with default settings
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 1940;
    this.top = 500;
    this.width = 50;
    this.height = 50;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the goodie's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the goodies left by 6px
    this.left -= 6;
    // Update the goodies's position on the screen
    this.updatePosition();
  }
}
// inherited goodies to create shrooms
class Shroom extends Goodie {
  constructor(gameScreen) {
    super(gameScreen);
    this.type = "shroom";
    this.element.src = "./images/character/trippy-mushroom-sticker.png";
  }
}
// inherited goodies to create sunshine
class Sunshine extends Goodie {
  constructor(gameScreen) {
    super(gameScreen);
    this.type = "sunshine";
    this.element.src = "./images/character/sunshine.png";
  }
}
