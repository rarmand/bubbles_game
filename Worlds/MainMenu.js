BasicGame.Preloader = function (game) 
{    
	this.background = null;    
	this.preloadBar = null;    
	this.ready = false;};

	BasicGame.Preloader.prototype = {    

	preload: function () 
	{      



	},    

	create: function () {      
		this.state.start('MainMenu'); 
		game.stage.backgroundColor = "#F3F3F3";    
   
	}
};