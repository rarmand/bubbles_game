// we want to start the physics system and then call the load state

var bootState = {

	// creation function is a standard Phaser function and is automatically called
	create: function() {

		// starting the physics system - in this case we are using the simple physics arcade engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// calling the load state
		game.state.start('load');
	},
};