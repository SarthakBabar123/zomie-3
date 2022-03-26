var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heartImg1, heartImg2, heartImg3;
var zombie, zombieImg;
var score;
var winSound, exploSound, loseSound;
var bullet;
var life = 3;
var gameState = "start";

function preload(){
  bgImg = loadImage("bg.jpeg");
  shooterImg = loadImage("shooter_2.png") ;
  shooter_shooting = loadImage("shooter_3.png");
  zombieImg = loadImage("zombie.png");
  heartImg1 = loadImage("heart_1.png");
  heartImg2 = loadImage("heart_2.png");
  heartImg3 = loadImage("heart_3.png");
  winSound = loadSound("win.mp3");
  loseSound = loadSound("lose.mp3");
  exploSound = loadSound("explosion.mp3");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  zombieGroup = new Group();
  bulletGroup = new Group();

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 0.7
  

//creating the player sprite
player = createSprite(displayWidth-1000, displayHeight-350,50,50);
player.addImage(shooterImg);
player.scale = 0.25;
player.debug = true
player.setCollider("rectangle",0,0,300,400)
//console.log(player.x)


plrHeart1 = createSprite(30,70,20,20);
plrHeart1.addImage("h1",heartImg1);
plrHeart1.scale=0.25;
plrHeart1.visible = false;

plrHeart2 = createSprite(100,70,20,20);
plrHeart2.addImage("h2",heartImg2);
plrHeart2.scale=0.25;
plrHeart2.visible = false;

plrHeart3 = createSprite(100,70,20,20);
plrHeart3.addImage("h3",heartImg3);
plrHeart3.scale=0.25;

score = 0
}

function draw() {
  background(0); 
  drawSprites();

  if(gameState==="start"){
    fill("white");
    textSize(40)
    text("welcome,please press S to start the game",400,400)
  }
  
  if(keyDown('s')&&gameState==="start"){
   gameState="play" 
  }

  if(gameState==="play"){
    
    if(life===3){
      plrHeart3.visible= true
      plrHeart1.visible = false
      plrHeart2.visible = false
    }
    if(life===2){
      plrHeart2.visible= true
      plrHeart1.visible = false
      plrHeart3.visible = false
    }
    if(life===1){
      plrHeart1.visible= true
      plrHeart3.visible = false
      plrHeart2.visible = false
    }
    if(life===0){
    gameState= "end"
    plrHeart1.visible = false;
    }
    if(score===20){
      gameState = "win"
      winSound.play();

    }

 //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")){
  player.y-= 10 ;
}

if(keyDown("DOWN_ARROW")){
  player.y+= 10 ;
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("SPACE")){
  player.addImage(shooter_shooting)
  bullet = createSprite(300,player.y-30,5,7);
  bullet.velocityX = 10;
  bulletGroup.add(bullet);
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("SPACE")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(player)){
  for(var i =0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life=life-1
    }
  }
}

if(zombieGroup.isTouching(bulletGroup)){
for(var l =0;l<zombieGroup.length;l++){
  if(zombieGroup[l].isTouching(bulletGroup)){
    zombieGroup[l].destroy();
    bulletGroup.destroyEach();
    score+=2;
    exploSound.play();
  }
}
}

createZombies();
  }
  if(gameState==="end"){
    stroke("yellow");
    textSize(40);
    text("Bad luck, you lost",400,400)
    textSize(50);
    text("Please press 'R' To Restart The Game",400,450)
    //player.destroy();
    //zombieGroup.destroyEach();
    loseSound.play();

    if(keyDown('r')){
      restart();
    }
  }
  else if(gameState==="win"){
   stroke("yellow");
    textSize(35);
    text("Win",400,400)
    textSize(50);
    text("Please press 'R' To Restart The Game",400,450)
    player.destroy();
    zombieGroup.destroyEach();
    //Restart();
  }
  stroke("white")
  textSize(30)
  text("score="+score,50,115)


}

function createZombies(){
  if(frameCount % 60===0){
  zombie = createSprite(random(700,1000),random(200,400),30,30)
  zombie.addImage(zombieImg)
  zombie.velocityX = -(3+score/2);
  zombie.scale= 0.15
  zombie.debug = true
  zombie.setCollider("rectangle",0,0,300,400)
  zombie.lifetime = 200;
  zombieGroup.add(zombie);
  }  
}

function restart(){
    gameState = "start";
   // player.destroy();
    //zombieGroup.destroyEach();
    score=0;

}