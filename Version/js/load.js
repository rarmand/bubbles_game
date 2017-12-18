// here we simply load out assets and then call the menu state

var loadState = {

	preload: function() {

		// add the loading label on the screen
		var loadingLabel = game.add.text(80,150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		// load all the assets 
		// first param is the pointer , second is the file itself
		game.load.image("player", "/assets/img/player.png");
		game.load.image("bullet", "/assets/img/bullet.png");

		game.load.script("filter", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js");


		game.load.image("mango", "/assets/owoce/mangob.png");
		game.load.image("pia", "/assets/owoce/pineb.png");
		game.load.image("grape", "/assets/owoce/grapeb.png");
	},

	create: function() {
		// call the menu state
		game.state.start('menu');
	},
};
