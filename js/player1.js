class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.velocityY = 0;
    this.gravity = 3;
    this.onGround = false;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.left = `${left}px`;
    this.element.style.height = `${height}px`;
    this.element.style.width = `${width}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    console.log("move called");
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 10) {
      this.left = 10;
    }

    if (this.top < 200) {
      this.top = 200;
    }

    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    if (this.top > this.gameScreen.offsetHeight - this.height - 200) {
      this.top = this.gameScreen.offsetHeight - this.height - 200;
    }

    if (!this.onGround) {
      if (this.velocityY < 0 && this.velocityY + this.gravity >= 0) {
        //this.element.style.animation =
        // "jump-down-animation 0.5s steps(8) infinite";
      }

      this.velocityY += this.gravity;
      this.top += this.velocityY;

      if (this.top > this.gameScreen.offsetHeight - this.height - 200) {
        this.top = this.gameScreen.offsetHeight - this.height - 200;
        this.onGround = true;
        this.velocityY = 0;
        //this.element.style.animation = "run-animation 0.5s steps(8) infinite";
      }
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstRect.right &&
      playerRect.right > obstRect.left &&
      playerRect.top < obstRect.bottom &&
      playerRect.bottom > obstRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  jump() {
    console.log("Jump");
    // this.directionY -= 10;
    //this.updatePosition();

    if (this.onGround) {
      this.velocityY = -80;

      this.onGround = false;
    }
  }
}

console.log("Hello World");
