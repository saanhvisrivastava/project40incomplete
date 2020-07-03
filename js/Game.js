class Game {
    constructor(){
  
    }
  
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
  
      player1 = createSprite(100,200);
      player1.addImage("player1",player1_img);
      player2= createSprite(300,200);
      player2.addImage("player2",player2_img);
      player3 = createSprite(500,200);
      player3.addImage("player3",player3_img);
      player4= createSprite(700,200);
      player4.addImage("player4",player4_img);
      
      players = [player1, player2, player3, player4];
    }
  
    play(){
      form.hide();

      Player.getPlayerInfo();
      player.getRank();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(ground, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the players
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the players a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the players in y direction
          y = displayHeight - allPlayers[plr].distance;
          players[index-1].x = x;
          players[index-1].y = y;
  
          if (index === player.index){
            //players[index - 1].shapeColor = "red";
            fill("blue");
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3700){
        gameState = 2;
        player.rank=player.rank+1;
        Player.rankUpdate(player.rank);
        text("Your rank is:"+player.rank,displayWidth/2,y-200);
  
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  }

  
  