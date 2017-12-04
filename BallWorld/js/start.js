var BallWorld = {
	velocity: 8
};

// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
});
 
// Called first
// to load assets like imgs, sounds
function preload() {
	game.load.image("ball", "/assets/img/rsz_ball1.png");
	game.load.image("bg", "/assets/background/wind2.jpg");
}
 
// Called after preload
// to draw everything, sprites, text, keys, handlers
function create() {
    
    // to center game canvas
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true; 

	// change background colour
	game.stage.backgroundColor = "#87CEEB";
	//background = game.add.tileSprite(0,0,800,600, "bg");
	

	// add the ball in the middle of the area
	this.ball = game.add.sprite(game.world.centerX, game.world.centerY, "ball");
	// kotwica pozwala na latwiejsze ustawienie pilki w srodku pola gry
	this.ball.anchor.set(0.5, 0.5);

	// key to move the ball
	this.keys = game.input.keyboard.createCursorKeys();
}
 
// Called once every frame, ideally 60 times per second
// for some input during the game, collisions, tests
function update() {
	// work of keys when they are clicked
	if (this.keys.left.isDown) {
		this.ball.x -= BallWorld.velocity;
	}
	if (this.keys.right.isDown) {
		this.ball.x += BallWorld.velocity;
	}
	if (this.keys.up.isDown) {
		this.ball.y -= BallWorld.velocity;
	}
	if (this.keys.down.isDown) {
		this.ball.y += BallWorld.velocity;
	}

	// preventing escape of the ball outside the array's boundaries
	var halfWidth = this.ball.width / 2;
	var halfHeight = this.ball.height / 2;

	if (this.ball.x - halfWidth < 0) {
		this.ball.x = halfWidth;
	}
	if (this.ball.x + halfWidth > game.width) {
		this.ball.x = game.width - halfWidth;
	}

	if (this.ball.y - halfHeight < 0) {
		this.ball.y = halfHeight;
	}
	if (this.ball.y + halfHeight > game.height) {
		this.ball.y = game.height - halfHeight;
	}

}