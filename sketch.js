var backImg,back;
var ground;
var girl,girl_flying;
var pillarImg,pillar,pillarGroup;
var spikes,spikesImg,spikeGroup;
var gems,gemsImg, gemsGroup;
var goldgem,goldgemImg,goldgemGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var replay,replayButton;
var swooshsound,diesound,pointsound;
var music;


function preload(){
  
  backImg=loadImage("clipart bground2-1.jpg"); 
  
  girl_flying=loadAnimation("blossom 2.png");
  
  spikesImg=loadImage("spikes.png");
  pillarImg=loadImage("pillar spikes.png");
  gemsImg=loadImage("gemstones.png");
  goldgemImg=loadImage("gold gems.png");
  replayButton=loadImage("replay button.png");
  
  swooshsound=loadSound("swoosh.mp3");
  pointsound=loadSound("point.mp3");
  diesound=loadSound("die.mp3");
  music=loadSound("8-bit loop (loop).mp3");
  
}


function setup() {
  createCanvas(887,520);
  
  music.loop();
  
  back=createSprite(300,200,900,900);
  back.velocityX=-3;
  back.scale=0.9;
  back.x=back.width/2;
  back.addImage(backImg);
  
  
  ground=createSprite(300,400,800,10);
  ground.velocityX=-2;
  
  girl=createSprite(30,350);
  girl.addAnimation("flying ", girl_flying);
  girl.scale=0.08;
  
  replay=createSprite(300,350);
  replay.addImage(replayButton);
  replay.scale=0.5;
  
  
  pillarGroup=new Group();
  spikeGroup=new Group();
  gemsGroup=new Group();
  goldgemGroup=new Group();
  
}

function draw() {
  background(255);
  
  
 //girl.debug=true;
  girl.setCollider("rectangle",0,0,100,girl.width);
  
  //console.log(gameState);
  
  if(gameState===PLAY){
    
  
  if(keyDown("space")){
    swooshsound.play();
    girl.velocityY=-12;
  }
  
  ground.visible=false;
  replay.visible=false;
    
    
  // for resetting invisible ground
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
  girl.velocityY=girl.velocityY+0.8;
  girl.collide(ground);
  
    //for resetting background
  if(back.x<=250){
    back.x=450;
  }
  
    //condition to gain score
  if(gemsGroup.isTouching(girl)){
    pointsound.play();
    score=score+1;
    gemsGroup.destroyEach();
  }
  
  if(goldgemGroup.isTouching(girl)){
    pointsound.play();
  score=score+3;
    goldgemGroup.destroyEach();
  }
  
    //condition for gamestate end
  if(spikeGroup.isTouching(girl) ||        
     pillarGroup.isTouching(girl)){
    diesound.play();
    gameState=END;   
}
    
   createPillars();
   createSpikes();
   createGems();
   goldgems();
   

  
}  
  
else if (gameState===END){
  replay.visible=true;
  girl.velocityX=0;
  girl.velocityY=0;
  ground.velocityX=0;
  spikeGroup.destroyEach();
  spikeGroup.setVelocityYEach(0);
  pillarGroup.setVelocityYEach(0);
  pillarGroup.destroyEach();
  gemsGroup.destroyEach();
  gemsGroup.setVelocityXEach(0);
  goldgemGroup.destroyEach();
  goldgemGroup.setVelocityYEach(0);
  back.velocityX=0;
  
  
 if(mousePressedOver(replay)){
   reset();
 } 
  
  
}
  
    drawSprites(); 
  
  //displaying scores
   textSize(17);
  fill("black");
  strokeWeight(2);
  stroke("red");
  text("SCORE" + score,10,40);
}
    
   // function to create pillars
function createPillars(){
  if(frameCount % 150===0){
 pillar=createSprite(700,40);
  pillar.velocityX=-4;
  pillar.lifetime=700;
  pillar.addImage(pillarImg);
  pillar.scale=0.6;
    
  pillarGroup.add(pillar);   
}  
}

//function to create spikes
function createSpikes(){
  if(frameCount % 100===0){
  spikes=createSprite(700,360);
  spikes.velocityX=-3;
  spikes.lifetime=700;
  spikes.addImage(spikesImg);
  spikes.scale=0.6;
    
  spikeGroup.add(spikes);
  
  }
}

//function to create red gems
function createGems(){
  if(frameCount % 250===0){
    gems=createSprite(700,Math.round(random(30,400)));
    gems.addImage(gemsImg);
    gems.scale=0.1;
    gems.lifetime=700;
    gems.velocityX=-4;
    
    gemsGroup.add(gems);
  }
}

//function to create gold gems
 function goldgems(){
 if(frameCount % 200===0 ){
   goldgem=createSprite(700,Math.round(random(30,400)))
   goldgem.addImage(goldgemImg);
   goldgem.scale=0.1;
   goldgem.velocityX=-4;
   goldgem.lifetime=700;
   
   goldgemGroup.add(goldgem);
   
 }
 }

//function to reset the game
 function reset(){
   gameState=PLAY;
   ground.velocityX=-2;
   score=0;
   back.velocityX=-3;
   
 }





