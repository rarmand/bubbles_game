// previous actions were made automatically, without human player having to do anything
// we want to display instructions to the player
// the start function will be called only when the player takes the required action
// press the "W" key

var menuState = {

	create: function() {

		// here we display the name of the game
		// fill refers to the font color
		var nameLabel = game.add.text(80, 80, 'Bubble Struggle', {font: '50px Courier', fill: '#ffffff'});

		// we give the player instructions on how to start the game
		var startLabel = game.add.text(80, game.world.height-80, 'press the W key to start', {font: '25px Courier', fill: '#ffffff' });

		// we define the W key as phasers one so that we can act when the player presses it
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

		// when player presses W, we call the start function
		wkey.onDown.addOnce(this.start, this);	
	},

	start: function() {
		game.state.start('play');
	},
};
