var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1, player2, player3, player4;

var ground, player1_img, player2_img, player3_img, player4_img,hurdles_img;

function preload(){
  ground = loadImage("images/ground.jpg");
  player1_img = loadImage("images/player1.jpg");
  player2_img = loadImage("images/player2.jpg");
  player3_img = loadImage("images/player3.jpg");
  player4_img = loadImage("images/player4.png");
  hurdles_img = loadImage("images/hurdles.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
