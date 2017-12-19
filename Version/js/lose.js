var loseState = {

	create: function() {

		game.stage.backgroundColor = "#000000";    

		var failLabel = game.add.text(80,80, 'Mission not complited!', {font: '42px Courier', fill: '#FF0000'});

		var startLabel = game.add.text(80, game.world.height-80, 'press the W key to restart', {font: '25px Courier', fill: '#ffffff'});

		// define the W key to player can press it and get an action
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

		wkey.onDown.addOnce(this.restart, this); 
	},

	restart: function() {
		floor = null;
		cursors = null;

		filter = null;
		background = null;

		player = null;

		bullets = null;
		bulletTime = 0;
		bullet = null;

		bubble0 = null;
		bubble1 = null;
		bubble2 = null;
		bubble3 = null;
		bubble4 = null;
		bubble5 = null;

		bubbles = null;

		lives = null;
		counter = 3;
		game.state.start('menu');
	}
};