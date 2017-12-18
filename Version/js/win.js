var winState = {

	create: function() {

		game.stage.backgroundColor = "#000000";    

		var winLabel = game.add.text(80,80, 'All the bubbles shot down!!!', {font: '42px Courier', fill: '#00FF00'});

		var startLabel = game.add.text(80, game.world.height-80, 'press the W key to restart', {font: '25px Courier', fill: '#ffffff'});

		// define the W key to player can press it and get an action
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

		wkey.onDown.addOnce(this.restart, this); 
	},

	restart: function() {
		game.state.start('menu');
	}
};