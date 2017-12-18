var game = new Phaser.Game(800, 600, Phaser.WEBGL, "gameDiv");


// basic objects in game
var floor = null;
var cursors = null;

var filter = null;
var background = null;

var player = null;

var bullets = null;
var bulletTime = 0;
var bullet = null;

var bubble0 = null;
var bubble1 = null;
var bubble2 = null;
var bubbles = null;

var lives = null;
var counter = 3;

// here we add each state. 
// we give it casual name that we will use when calling it
// and an official name that will be used when defining it
// e.g. in their files 
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win' , winState);
game.state.add('lose', loseState);


// after all of the states are added, we start the game by calling the boot state
game.state.start('boot');