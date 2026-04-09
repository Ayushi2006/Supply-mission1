var gameOver = false;
var missionComplete = false;

var targetX, targetY;
var dropZoneWidth = 50;

var score = 0;
var goal = 0;

var packageDropped = false;

var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground, groundSprite;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

function preload() {
  helicopterIMG = loadImage("helicopter.png");
  packageIMG = loadImage("package.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  // Random goal
  goal = floor(random(1, 6));

  // Helicopter
  helicopterSprite = createSprite(width / 2, 200);
  helicopterSprite.addImage(helicopterIMG);
  helicopterSprite.scale = 0.6;

  // Package sprite
  packageSprite = createSprite(width / 2, 80);
  packageSprite.addImage(packageIMG);
  packageSprite.scale = 0.2;

  // Ground sprite
  groundSprite = createSprite(width / 2, height - 10, width, 20);
  groundSprite.shapeColor = color(255);

  // Physics
  engine = Engine.create();
  world = engine.world;

  // Ground body
  ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
    isStatic: true,
  });
  World.add(world, ground);

  createNewPackage();

  // Target
  targetX = random(100, width - 100);
  targetY = height - 50;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  World.remove(world, ground);

  ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
    isStatic: true,
  });
  World.add(world, ground);

  groundSprite.position.x = width / 2;
  groundSprite.position.y = height - 10;
  groundSprite.width = width;
}

function draw() {
  background(0);
  Engine.update(engine);

  // Stop controls if game over or completed
  if (!gameOver && !missionComplete) {
    if (keyDown(LEFT_ARROW)) helicopterSprite.x -= 5;
    if (keyDown(RIGHT_ARROW)) helicopterSprite.x += 5;
    if (keyDown(UP_ARROW)) helicopterSprite.y -= 5;
    if (keyDown(DOWN_ARROW)) helicopterSprite.y += 5;
  }

  // Follow helicopter before drop
  if (!packageDropped) {
    Body.setPosition(packageBody, {
      x: helicopterSprite.x,
      y: helicopterSprite.y + 40,
    });
  }

  // Sync sprite
  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;

  // Straight drop
  if (packageDropped) {
    Body.setVelocity(packageBody, {
      x: 0,
      y: packageBody.velocity.y,
    });
  }

  // Check landing
  if (
    packageDropped &&
    packageBody.position.y >= targetY - 10 &&
    !gameOver &&
    !missionComplete
  ) {
    let d = dist(
      packageBody.position.x,
      packageBody.position.y,
      targetX,
      targetY,
    );

    if (d < dropZoneWidth) {
      score++;

      if (score >= goal) {
        missionComplete = true;
      } else {
        packageDropped = false;
        createNewPackage();
        targetX = random(100, width - 100);
      }
    } else {
      gameOver = true;
    }
  }

  // Draw target
  stroke(255, 0, 0);
  strokeWeight(4);
  line(targetX - 20, targetY - 20, targetX + 20, targetY + 20);
  line(targetX + 20, targetY - 20, targetX - 20, targetY + 20);

  // UI
  noStroke();
  fill(255);
  textSize(20);
  text("Score: " + score, 20, 30);
  text("Goal: " + goal, 20, 60);

  // Game Over Screen
  if (gameOver) {
    textAlign(CENTER, CENTER);

    fill(255, 0, 0);
    textSize(40);
    text("MISSION FAILED 🚫", width / 2, height / 2);

    fill(255);
    textSize(20);
    text("Press R to Restart", width / 2, height / 2 + 50);
  }

  // Mission Complete
  if (missionComplete) {
    textAlign(CENTER, CENTER);

    fill(0, 255, 0);
    textSize(40);
    text("MISSION ACCOMPLISHED 🎉", width / 2, height / 2);

    fill(255);
    textSize(20);
    text("Press R to Play Again", width / 2, height / 2 + 50);
  }

  drawSprites();
}

// Controls
function keyPressed() {
  // Drop
  if (keyCode === 32 && !packageDropped && !gameOver && !missionComplete) {
    Body.setStatic(packageBody, false);
    packageDropped = true;
  }

  // Restart
  if (key === "r" || key === "R") {
    restartGame();
  }
}

// Restart
function restartGame() {
  score = 0;
  gameOver = false;
  missionComplete = false;
  packageDropped = false;

  goal = floor(random(10, 16));

  helicopterSprite.x = width / 2;
  helicopterSprite.y = 200;

  createNewPackage();
  targetX = random(100, width - 100);
}

// New package
function createNewPackage() {
  if (packageBody) {
    World.remove(world, packageBody);
  }

  packageBody = Bodies.circle(helicopterSprite.x, helicopterSprite.y + 40, 5, {
    restitution: 0.1,
    isStatic: true,
  });

  World.add(world, packageBody);
}
