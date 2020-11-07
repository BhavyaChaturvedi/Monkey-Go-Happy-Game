var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0, score;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {

createCanvas(400, 400);
monkey = createSprite(80, 315, 20, 20);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1;

ground = createSprite(400, 350, 900, 10);
ground.velocityX = -4;
  
bananaGroup = new Group();
obstacleGroup = new Group();
  
score = 0;
}


function draw() {
background("white");
  
stroke("black");
textSize(10);
fill("black");  
text("Score : "+ score, 280, 40);
  
stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 50, 50);

ground.visible = true;

if(keyDown("space")&& monkey.y >= 100) {
   monkey.velocityY = -12;
}
 
if(bananaGroup.isTouching(monkey)){
  score = score+2;
  bananaGroup.destroyEach();
} switch(score){
    
  case 10: monkey.scale = 0.12;
    break;
    
  case 20: monkey.scale = 0.14;
    break;
  
  case 30: monkey.scale = 0.16;
    break;
    
  case 40: monkey.scale = 0.18;
    break;
    default: break;
}
   
if (ground.x < 0){
    ground.x = ground.width/2;
} 
 
if(obstacleGroup.isTouching(monkey)){
  monkey.scale = 0.1;
}
  
food();
obstacles();
  
ground.velocityX = -8;
monkey.velocityY = monkey.velocityY + 0.8;
monkey.collide(ground);
  

drawSprites();
}


function food () {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,10,40);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.lifetime = 200;
   bananaGroup.add(banana);
    
    }
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}