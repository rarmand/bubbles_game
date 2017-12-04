// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
});
 

function preload() {
	game.load.image("ball", "/assets/img/jaw.png");
	game.load.image("bullet", "/assets/img/bullet2.png");
}

var sprite;
var bullets;
var cursors;

var bulletTime = 0;
var bullet;



function create() {
    
    // to center game canvas
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true; 

	// change background colour
	game.stage.backgroundColor = '#2d2d2d';


	// ustawianie grup

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
 
	for (var i = 0; i < 20; i++) {
		var b = bullets.create(0,0,"bullet");
		b.name = "bullet" + 1;
		b.exists = false;
		b.visible = false;
		b.checkWorldBounds = true;
		b.events.onOutOfBounds.add(resetBullet, this);
	}

	sprite = game.add.sprite(400,500, "ball");
	game.physics.enable(sprite, Phaser.Physics.ARCADE);

	cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

}
	

function update() {
	//  As we don't need to exchange any velocities or motion we can the 'overlap' check instead of 'collide'
    //game.physics.arcade.overlap(bullets, veggies, collisionHandler, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 300;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x + 6, sprite.y - 8);
            bullet.body.velocity.y = -300;
            bulletTime = game.time.now + 150;
        }
    }

}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {

    bullet.kill();

}

//  Called if the bullet hits one of the veg sprites
function collisionHandler (bullet) {

    bullet.kill();
    //veg.kill();

}