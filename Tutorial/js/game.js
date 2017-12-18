var game = new Phaser.Game(640, 480, Phaser.AUTO, "gameDiv");

// here we add each state. 
// we give it casual name that we will use when calling it
// and an official name that will be used when defining it
// e.g. in their files 
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);


// after all of the states are added, we start the game by calling the boot state
game.state.start('boot');