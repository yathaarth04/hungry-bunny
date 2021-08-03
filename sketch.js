var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rab, rab_running, rab_collided;
var ground, invi_ground, groundImage;

var carrotGroup, carrotImage;
var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;
var lives=3;


var gameOver, restart;

function preload(){
  rab_running = loadAnimation("bunny_2.png","bunny_3.png","bunny_5.png","bunny_2.png");
  rab_collided = loadAnimation("bunny_colide.png");
  groundImage = loadImage("backg.jpg");
  
  carrotImage = loadImage("carrot.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle1 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1200, 400);
 
  ground = createSprite(0,0,1200,400);
  ground.addImage( groundImage)
  ground.scale=2.75;

  rab = createSprite(60,335,20,50);
  rab.addAnimation("running", rab_running);
  rab.scale = 1;
  rab.debug=true;
  rab.setCollider("rectangle",0,0,50,100) 

  invi_ground=createSprite(300,391,1200,5) ;
  invi_ground.visible=false;

  restart = createSprite(445,180);
  restart.addImage(restartImg);
  restart.scale = 1;
  //gameOver.scale = 0.5;


  //gameOver.visible = false;
  restart.visible = false;
  
  carrotGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  background(0);

  drawSprites();

  textSize(20);
  fill("red");
  text("Score: "+ score, 1050,40);
  text("Life: "+ lives, 1050,60);
  rab.collide(invi_ground);
  text(mouseX+","+mouseY,mouseX,mouseY)


  if (gameState===PLAY){
  
      ground.velocityX = -(5  + 3*score/100);
 
    if(keyDown("space") && rab.y >= 139) {
      rab.velocityY = -13   ;
    }
  
    rab.velocityY = rab.velocityY + 1

    if (ground.x <0){
      ground.x = ground.width/2;
    }
  
     spawncarrot();
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(rab)){
    lifeover()   
    gameState = END;
    } 
    if (carrotGroup.isTouching(rab)) {
      score = score + 1;
      //coinSound.play();
     
     carrotGroup[0].destroy();
          }

  }
  
  else if (gameState === END ) {
    //gameOver.visible = true;
    if(lives>0){
    restart.visible = true;
    }
    rab.addAnimation("collided", rab_collided);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    rab.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    carrotGroup.setVelocityXEach(0);
    
    //change the trex animation
    rab.changeAnimation("collided",rab_collided);
    rab.scale =1.5;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    carrotGroup.setLifetimeEach(-1);

    if (mousePressedOver (restart)){
      reset()

    }

  }
}

function spawncarrot() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var carrot = createSprite(1200,200,40,10);
    carrot.debug=true;
    carrot.y = Math.round(random(20,240));
    carrot.addImage(carrotImage);
    carrot.scale = 0.15;
    carrot.velocityX = -(5+ 3*score/100);;
    
     //assign lifetime to the variable
    carrot.lifetime = 200;
    
    //adjust the depth
    carrot.depth = rab.depth;
    rab.depth = rab.depth + 1;
    
    //add each cloud to the group
    carrotGroup.add(carrot);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(1200,370,10,40);
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150)    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle2);
              break;
    }
        
    obstacle.velocityX = -(5+ 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function lifeover()
{
    lives = lives-1;

  if(lives >= 1)
    {
      gamestate = "PLAY";
    }
  
   else 
    {
      gamestate = "END";
      gameover=createSprite(210,100,10,10);
      gameover.addImage(gameOverImg);
    }
}

function reset(){
  gameState=PLAY
  restart.visible=false
  obstaclesGroup.destroyEach()
  carrotGroup.destroyEach
  rab.changeAnimation("running",rab_running)
  rab.scale=1.5
  score=0
}