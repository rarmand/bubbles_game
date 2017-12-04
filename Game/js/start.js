// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, [Phaser.WEBGL, Phaser.CANVAS], "", {
    preload: preload,
    create: create,
    update: update,
    render: render
});
 

function preload() {
    game.load.image("player", "/assets/img/player.png");
    game.load.image("bullet", "/assets/img/bullet1.png");

    game.load.script("filter", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js");


    game.load.image("mango", "/assets/fruits/mango.png", 64, 64);
    game.load.image("pia", "/assets/fruits/pineapple.png", 64, 64);
    game.load.image("grape", "/assets/fruits/grape.png", 64, 64);

}


// basic objects in game
var floor;
var cursors;

var filter;
var background;

var player;

var bullets;
var bulletTime = 0;
var bullet;

var bubble1;
var bubble2;
var bubble3;
var bubbles;

function create() {
    
    // to center game canvas
	game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true; 

    // to set background as a filter
    game.stage.backgroundColor = "#D3D3D3";    

    background = game.add.sprite(0, 0);
    background.width = 800;
    background.height = 600;
    filter = game.add.filter("Marble", 800, 600);
    filter.alpha = 0.1;
    background.filters = [filter];


    // w tej części też licznik życia i czasu w górnym panelu
    // dodanie podłoża
    floor = new Phaser.Rectangle(0, 590, 800, 10);

    /************************************************************************/

    // dodawanie broni
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

    // dodanie postaci
    player = game.add.sprite(game.world.centerX, 540, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);


    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


    /************************************************************************/


    // bubble i ustawienie grawitacji
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  set the world (global) gravity
    game.physics.arcade.gravity.y = 150;

    // wyłączenie grawitacji dla player
    player.body.allowGravity = false;



    // ustawienie startowej postaci bubbli
    bubble1 = game.add.sprite(0, 500, "pia");
    bubble2 = game.add.sprite(800, 500, "grape");
    bubble3 = game.add.sprite(400, 500, "mango");


    game.physics.enable( [ bubble1, bubble2, bubble3 ], Phaser.Physics.ARCADE);

    bubble1.body.velocity.setTo(120,250);
    bubble1.body.collideWorldBounds = true;
    bubble1.body.bounce.set(1);

    bubble2.body.velocity.setTo(120,250);
    bubble2.body.collideWorldBounds = true;
    bubble2.body.bounce.set(1);
    
    bubble3.body.velocity.setTo(120,250);
    bubble3.body.collideWorldBounds = true;
    bubble3.body.bounce.set(1);

    bubbles = game.add.group();
    bubbles.add(bubble1);
    bubbles.add(bubble2);
    bubbles.add(bubble3);

}
	

function update() {

    filter.update();


    game.physics.arcade.overlap(bullets, bubbles, collisionHandler, null, this);


    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // ruch gracza za pomocą strzałek
    if (cursors.left.isDown) {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

    // ograniczenie na brzegi gry
    if (player.x <= 0) {
       player.x = 0;
    }
    if (player.x + player.width >= game.width) {
        player.x = game.width - player.width;
    }


    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }


    // zderzenia bubbles
    if (game.physics.arcade.collide(player, bubble1) || 
        game.physics.arcade.collide(player, bubble2) ||
        game.physics.arcade.collide(player, bubble3)    ) {
            //game.paused = true;
    }
    
    
    
}

function render() {

    game.debug.geom(floor, "#2d2d2d");
}


function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 8);
            bullet.body.velocity.y = -450;
            bulletTime = game.time.now + 150;
        }
    }

}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {

    bullet.kill();

}

//  Called if the bullet hits one of the veg sprites
function collisionHandler (bullet, bubble) {

    bullet.kill();
    bubble.kill();
}