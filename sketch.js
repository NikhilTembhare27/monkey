var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var banana,bananaImage
var obstacle,obstacleImage
var obstaclesGroup
var bananaGroup
var score = 0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   bananaImage = loadImage("banana.png")
   obstacleImage = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstaclesGroup = new Group()
  bananaGroup = new Group()
}

function draw() { 
  background(255);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnbanana()
  spawnobstacles()
 if(player.isTouching(bananaGroup)){
   score= score+1
   bananaGroup.destroyEach()

 }

  }

  
 if(player.isTouching(obstaclesGroup)){
   gameState = END
  obstaclesGroup.destroyEach()
  player.destroy()
  bananaGroup.destroyEach()
  backgr.destroy()
  ground.destroy()
 
}
if(gameState=== END){
  textSize(40)
  text("GAME OVERR",400,200)
}

  drawSprites();
  textSize(20)
  text("score"+score,100,50)
}

function spawnbanana(){
  if (frameCount % 90 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200; 
    bananaGroup.add(banana) 
    //adjust the depth
  //  cloud.depth = trex.depth;
   // trex.depth = trex.depth + 1;s
    
    //add each cloud to the group
    //cloudsGroup.add(cloud);
  }
}
function spawnobstacles(){
  if (frameCount % 90 === 0){
    var obstacle = createSprite(500,300,10,40);
    obstacle.velocityX = -5
    obstacle.addImage(obstacleImage)
    obstaclesGroup.add(obstacle)
    
     //generate random obstacles
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    
     obstaclesGroup.add(obstacle);
  }
 }