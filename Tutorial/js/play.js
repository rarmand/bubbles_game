var playState = {

	create: function() {
		// prepare the keyboard for player to play
		this.keyboard = game.input.keyboard;

		// create the player sprite and enable physics
		this.player = game.add.sprite(16,16,'player');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		// create the win sprite and enable physics
		this.win = game.add.sprite(256, 256, 'win');
		game.physics.enable(this.win, Phaser.Physics.ARCADE);
	},

	update: function() {

		// when the player and win overlap, the Win function is called
		game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

		// means of moving
		// enabling movement along the X axis
		if (this.keyboard.isDown(Phaser.Keyboard.A)) {
			this.player.body.velocity.x = -175;
		}
		else if (this.keyboard.isDown(Phaser.Keyboard.D)) {
			this.player.body.velocity.x = 175;
		}
		else {
			this.player.body.velocity.x = 0;
		}


		// movement along Y axis

		if (this.keyboard.isDown(Phaser.Keyboard.W)) {
			this.player.body.velocity.y = -175;
		}
		else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player.body.velocity.y = 175;
		}
		else {
			this.player.body.velocity.y = 0;
		}

	},

	Win: function() {
		game.state.start('win');
	},
};