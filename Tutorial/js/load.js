// here we simply load out assets and then call the menu state

var loadState = {

	preload: function() {

		// add the loading label on the screen
		var loadingLabel = game.add.text(80,150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		// load all the assets 
		// first param is the pointer , second is the file itself
		game.load.image('player', 'assets/win.png');
		game.load.image('win', 'assets/player.png');
	},

	create: function() {
		// call the menu state
		game.state.start('menu');
	},
};