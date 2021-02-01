new p5(function (sketch) {
  /** @type {p5.Sprite} */
  var ship;

  /** @type {p5.Image} */
  var shipImage;

  /** @type {p5.Image} */
  var bulletImage;

  /** @type {p5.Image} */
  var particleImage;

  /** @type {p5.Image[]} */
  var asteroidImages = [];

  var bullets = new sketch.Group();
  var asteroids = new sketch.Group();

  var MARGIN = 40;
  var SPACE = 32;
  var SHIP_NORMAL = "normal";
  var SHIP_THRUST = "thrust";
  var CIRCLE = "circle";
  var RECTANGLE = "rectangle";
  var ASTEROID_LARGE = 3;
  var ASTEROID_MEDIUM = 2;
  var ASTEROID_SMALL = 1;

  /**
   * Preload.
   */
  sketch.preload = function () {
    bulletImage = sketch.loadImage("assets/asteroids_bullet.png");
    shipImage = sketch.loadImage("assets/asteroids_ship0001.png");
    particleImage = sketch.loadImage("assets/asteroids_particle.png");

    for (var i = 0; i < 3; i++) {
      var asteroidImage = sketch.loadImage("assets/asteroid" + i + ".png");
      asteroidImages.push(asteroidImage);
    }
  };

  /**
   * Setup.
   */
  sketch.setup = function () {
    var canvasWidth = sketch.windowWidth;
    var canvasHeight = sketch.windowHeight;
    sketch.createCanvas(canvasWidth, canvasHeight);

    ship = sketch.createSprite(sketch.width / 2, sketch.height / 2);
    ship.maxSpeed = 8;
    ship.friction = 0.01;
    ship.setCollider(RECTANGLE, 5, 0, 30, 20);

    ship.addImage(SHIP_NORMAL, shipImage);
    ship.addAnimation(
      SHIP_THRUST,
      "assets/asteroids_ship0002.png",
      "assets/asteroids_ship0007.png"
    );

    for (
      var i = 0, total = Math.floor((canvasWidth * canvasHeight) / 60000);
      i < total;
      i++
    ) {
      var ang = sketch.random(360);
      var px = sketch.width / 2 + 1000 * Math.cos(sketch.radians(ang));
      var py = sketch.height / 2 + 1000 * Math.sin(sketch.radians(ang));
      createAsteroid(ASTEROID_LARGE, px, py);
    }
  };

  /**
   * Draw.
   */
  sketch.draw = function () {
    sketch.background(0);

    for (var i = 0; i < sketch.allSprites.length; i++) {
      var s = sketch.allSprites[i];
      if (s.position.x < -MARGIN) {
        s.position.x = sketch.width + MARGIN;
      }
      if (s.position.x > sketch.width + MARGIN) {
        s.position.x = -MARGIN;
      }
      if (s.position.y < -MARGIN) {
        s.position.y = sketch.height + MARGIN;
      }
      if (s.position.y > sketch.height + MARGIN) {
        s.position.y = -MARGIN;
      }
    }

    asteroids.overlap(bullets, hitAsteroid);
    asteroids.overlap(ship, hitAsteroid);

    if (sketch.keyDown(sketch.LEFT_ARROW)) {
      ship.rotation -= 4;
    }
    if (sketch.keyDown(sketch.RIGHT_ARROW)) {
      ship.rotation += 4;
    }
    if (sketch.keyDown(sketch.UP_ARROW)) {
      ship.addSpeed(0.5, ship.rotation);
      ship.changeAnimation(SHIP_THRUST);
    } else {
      ship.changeAnimation(SHIP_NORMAL);
    }

    if (!ship.removed && sketch.keyWentDown(SPACE)) {
      var bullet = sketch.createSprite(ship.position.x, ship.position.y);
      bullet.addImage(bulletImage);
      bullet.setSpeed(10 + ship.getSpeed(), ship.rotation);
      bullet.life = 30;
      bullets.add(bullet);
    }

    sketch.drawSprites();

    sketch.fill(255);
    sketch.strokeWeight(4);
    sketch.stroke(0);
    sketch.textAlign(sketch.CENTER);
    sketch.text("Controls: Arrow Keys + Space", sketch.width / 2, 20);
  };

  /**
   * Creates an asteroid.
   *
   * @param {number} type - From 0 to 2.
   * @param {number} x
   * @param {number} y
   * @return {p5.Sprite|void}
   */
  function createAsteroid(type, x, y) {
    if (type < ASTEROID_SMALL || type > ASTEROID_LARGE) {
      return;
    }

    var asteroid = sketch.createSprite(x, y);
    var asteroidImage = sketch.random(asteroidImages);
    asteroid.addImage(asteroidImage);
    asteroid.setSpeed(sketch.random(2.5, 4) - type / 2, sketch.random(360));
    asteroid.rotationSpeed = 0.5;
    asteroid.type = type;

    switch (type) {
      case ASTEROID_MEDIUM:
        asteroid.scale = 0.6;
        break;
      case ASTEROID_SMALL:
        asteroid.scale = 0.3;
        break;
    }

    asteroid.mass = 2 + asteroid.scale;
    asteroid.setCollider(CIRCLE, 0, 0, 40);
    asteroids.add(asteroid);

    return asteroid;
  }

  /**
   * Detects asteroid collision with ship or bullet.
   *
   * @param {p5.Sprite} asteroid
   * @param {p5.Sprite} sprite
   */
  function hitAsteroid(asteroid, sprite) {
    sprite.remove();
    asteroid.remove();
    asteroid.type--;

    if (asteroid.type >= ASTEROID_SMALL) {
      createAsteroid(asteroid.type, asteroid.position.x, asteroid.position.y);
      createAsteroid(asteroid.type, asteroid.position.x, asteroid.position.y);
    }

    for (
      var i = 0, total = ship ? 10 : Math.floor(sketch.random(3, 10));
      i < total;
      i++
    ) {
      var particle = sketch.createSprite(sprite.position.x, sprite.position.y);
      particle.addImage(particleImage);
      particle.setSpeed(sketch.random(3, 5), sketch.random(360));
      particle.friction = 0.01;
      particle.life = 15;
    }
  }
});
