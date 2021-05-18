var canvas, backgroundImage;
var restart, main, maintxt = "";
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var jump = 0;
var height = 0;
var hurdl, playerstate = "in";
var database;
var index
var form, player, game;
var y1, jump_val, jump_val2;
var runners, runner1, runner2;
var track, runner1_img, runner2_img, ground_img,hurcle_img;
var playerid;
var re,retxt = "";
var hurdle1, hurdle1a ;
var hurdle2, hurdle2a ;
var hurdle3, hurdle3a ;
var hurdle4, hurdle4a  ;

function preload(){
  track1 = loadImage("./images/track1.png");
  runner1_img = loadImage("./images/runner.png");
  runner2_img = loadImage("./images/runner.png");
  
  ground_img = loadImage("./images/ground.png");
  hurcle_img = loadImage("./images/Untitled.png");
  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
   hurdl = new hurdles() 
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  hurdl.display(); 

}


function isTouching(object1,object2){
  if(object1.x - object2.x < object2.width/2 + object1.width/2
    && object2.x - object1.x < object2.width/2 + object1.width/2
    && object1.y - object2.y < object2.height/2 + object1.height/2
    && object2.y - object1.y < object2.height/2 + object1.height/2){
    return true;
   }
  else {
      return false; 
  }
}