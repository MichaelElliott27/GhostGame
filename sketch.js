var ghostStanding;
var doorPictrue;
var climberPicture;
var towerPicture;
var ghost;
var climber,door;
var spookySound;
var doorsGroup,climberGroup,invisibleClimberGroup;
var invisibleClimber;
var PLAY = 1,END = 0;
var gameState = PLAY;
function preload(){
  ghostStanding = loadImage("ghost-standing.png");
  climberPicture = loadImage("climber.png");
  towerPicture = loadImage("tower.png");
  spookySound = loadSound("spooky.wav");
  doorPicture = loadImage("door.png");
}


function setup(){
  createCanvas(600,600);
 spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerPicture);
  tower.velocityY = 5.5;
  
  ghost = createSprite(200,200,20,20);
  ghost.addImage(ghostStanding);
  ghost.scale = 0.4;
  doorGroup = new Group()
  climberGroup = new Group()
  invisibleClimberGroup = new Group()
}



function draw(){
 background(0);
   if(gameState === PLAY){
     
   if(tower.y > 400 ){
    tower.y = height/2;
   }
  if(keyDown("left_arrow")){
    ghost.x -= 2
  }
  if(keyDown("right_arrow")){
    ghost.x += 2;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
 if(ghost.isTouching(climberGroup)){
   ghost.velocityY = 0;
  }
  if(ghost.isTouching(invisibleClimberGroup)||ghost.y> 600){
    ghost.destroy()
    gameState = END;
  }  
  ghost.velocityY += 0.8; 
  
  spawnClimber();
  drawSprites();
   }
  else
    if(gameState === END){
    textSize (30);
    stroke("yellow");
    fill("yellow");
    text("GameOver",230,250)
    }
}
function spawnClimber(){
  if(frameCount%100 === 0){
  
  var rand = Math.round(random(100,400))
  door = createSprite(rand,-200,10,10);
  door.addImage(doorPicture);
  door.velocityY = 5;
  door.lifetime = 250;
  ghost.depth = door.depth;
  ghost.depth +=1;
    doorGroup.add(door);
    climber = createSprite(rand,-150);
    climber.addImage(climberPicture);
    climber.velocityY = 5;
    climber.lifetime = 250;
    climberGroup.add(climber);
    invisibleClimber = createSprite(rand,-130)
    invisibleClimber.width = climber.width;
    invisibleClimber.height = 2;
    invisibleClimber.velocityY = 5; 
    invisibleClimber.lifetime = 250;
    invisibleClimber.visible = false;
 invisibleClimberGroup.add(invisibleClimber);
  }
  
}
