
class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
    gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,100);
    runner1.addImage("runner1",runner1_img);
    runner2 = createSprite(100,300);
    runner2.addImage("runner2",runner2_img);
    
    runners = [runner1, runner2];

  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track1,0,-20,displayWidth*5,displayHeight);
      //index of the array
      var index = 0;
      //x and y position of the runners
      var x = 50;
      var y = 140 ;
      for(var plr in allPlayers){
      index = index + 1 ;
      y = y + 260;
      //use data form the database to display the runners in y direction
      x = 360 + allPlayers[plr].distance;
      y = 360 - allPlayers[plr].jump;
      
      runners[index-1].x = x;
      runners[index-1].y = y;
      if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = runners[index-1].x;
          camera.position.y = displayHeight/2;
      }
      //textSize(15);
      }

    }

    // for moving foward
    if(keyIsDown(UP_ARROW) && player.index !== null && playerstate == "in"){
      player.distance += 50
      player.update();
    }
    if (index === player.index) {
      // console.log("yes")
      stroke(10);
      fill("red");
      ellipse(x, y, 60, 60);
   
      camera.position.x = runners[index - 1].x;
      camera.position.y = runners[index - 1].y;
      player.x = x;
      player.y = y;
    }
    

    
  
    if (playerid === 1 ){

      jump_val = -100
      jump_val2 = -25

      if(player.jump <= -100 && (player.distance === 1650 || player.distance === 2450 || player.distance === 3850 || player.distance === 5250 || player.distance === 5650) ){
        playerstate = "out";
        maintxt = "You did not jump the hurdle"
        gameState = 3;
      }
      if(player.jump >= -30 && ( player.distance === 2100||player.distance === 3200) ){
        playerstate = "out";
        maintxt = "No Cheating Allowed. Game Over"
        text("No Cheating You Are Disqualified",displayWidth /2, displayHeight/2)
        gameState = 3;
      }
    }
    


    if (playerid === 2 ){
      jump_val = 100
      jump_val2 = 175
      if(player.jump <= 100 && ( player.distance === 1650 || player.distance === 2450 || player.distance === 3850 || player.distance === 5250 || player.distance === 5650) ){
        playerstate = "out";
        maintxt = "You did not jump the hurdle"
        gameState = 3; 
      }  
      if(player.jump >= 170 && ( player.distance === 2100||player.distance === 3200) ){
        playerstate = "out";
        maintxt = "No Cheating Allowed. Game Over"
        text("No Cheating You Are Disqualified",displayWidth /2, displayHeight/2)
        gameState = 3; 
      }
      
    }

    console.log(player.jump);

    if(keyDown("space")){
      push()
      player.jump = jump_val2;
      player.update();
      pop()
    }else{
      player.jump = jump_val;
      player.update();
    }   
    //console.log (jump_val) ;console.log (jump_val2) 

   

    if(player.distance === (6500)){
      gameState = 3;
      player.update();
    }
    
    restart = createButton('Restart');
    restart.position(1200,10);
    if (gameState ==2 || gameState == 1){
      restart.hide();
    }
          
    restart.mousePressed(()=>{
      retxt = "pls reload this page to play again"
      re.html(retxt)
      database.ref('/').set({
        playerCount: 0,
        gameState : 0
      });
       
    })

    re = createElement('h3')
    re.html(retxt)
    re.position (600,300)
    // game stoping code
    if(gameState === 3){
      restart.show();
      main= createElement('h2');
      main.html(maintxt) 
      main.position(displayWidth/2, displayHeight/2)
    }
      
 
         

    


    drawSprites();
  }

  //game end tell

  end(){
    console.log("game ended");
  }

}
