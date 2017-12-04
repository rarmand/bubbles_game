var BallWorld = {
	velocity: 8
};

// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
 
// Called first
// to load assets like imgs, sounds
function preload() {
	game.load.image("ball", "/assets/img/rsz_ball1.png");
	game.load.image("bg", "/assets/background/wind2.jpg");
}

var sprite1;
var sprite2;
var sprite3;
var sprite4;
 
// Called after preload
// to draw everything, sprites, text, keys, handlers
function create() {
    
    // to center game canvas
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true; 

	// change background colour
	game.stage.backgroundColor = "#87CEEB";


	// FIZYKA !!

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Set the world (global) gravity
    game.physics.arcade.gravity.y = 200;

    //  Sprite 1 will use the World (global) gravity
    sprite1 = game.add.sprite(100, 96, 'ball');

    //  Sprite 2 is set to ignore the global gravity and use its own value
    sprite2 = game.add.sprite(300, 96, 'ball');

    // Sprite to observe his bouncing behaviour
	image = game.add.sprite(400,400, 'ball');
	

    // Enable physics on those sprites
    game.physics.enable( [ sprite1, sprite2, image ], Phaser.Physics.ARCADE);

    sprite1.body.collideWorldBounds = true;
    sprite1.body.bounce.y = 1;
    
    sprite2.body.collideWorldBounds = true;
    sprite2.body.bounce.y = 1;


    // SETTING BOUNCING
    // set its moving
    image.body.velocity.setTo(200,200);

    // making the game world bounce-able
    image.body.collideWorldBounds = true;

    // setting bouncing energy for the horizontal and vertical vectors
    // 1 - 100 % energy
    image.body.bounce.set(1);
}
	

function update() {
	
}


function render() {

    game.debug.text('world gravity', sprite1.x - 32, 64);
    game.debug.text('local gravity', sprite2.x - 32, 64);

    game.debug.spriteInfo(image, 32, 32);
}