
var menuState = {

	create: function() {

		// here we display the name of the game
		// fill refers to the font color
		var nameLabel = game.add.text(80, 80, 'Bubble Struggle', {font: '50px Courier', fill: '#ffffff'});

		// we give the player instructions on how to start the game
		var startLabel1 = game.add.text(80, game.world.height-110, 'press the A key to start level 1', {font: '25px Courier', fill: '#ffffff' });
		var startLabel2 = game.add.text(80, game.world.height-80, 'press the S key to start level 2', {font: '25px Courier', fill: '#ffffff' });
		var startLabel3 = game.add.text(80, game.world.height-50, 'press the D key to start level 3', {font: '25px Courier', fill: '#ffffff' });

		// we define the keys so that we can act when the player presses it
		var akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		akey.onDown.addOnce(this.lvl1, this);	

		var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		skey.onDown.addOnce(this.lvl2, this);	

		var dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		dkey.onDown.addOnce(this.lvl3, this);	
	},

	lvl1: function() {
		game.state.start('level1');
	},
	lvl2: function() {
		game.state.start('level2');
	},
	lvl3: function() {
		game.state.start('level3');
	},
};
