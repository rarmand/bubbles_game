// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, Phaser.WEBGL, "", {
    preload: preload,
    create: create,
    update: update,
    render: render
});
 

function preload() {
    game.load.image("player", "/assets/img/player.png");
    game.load.image("bullet", "/assets/img/bullet.png");

    game.load.script("filter", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js");


    game.load.image("mango", "/assets/owoce/mangob.png");
    game.load.image("pia", "/assets/owoce/pineb.png");
    game.load.image("grape", "/assets/owoce/grapeb.png");
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

var bubble0;
var bubble1;
var bubble2;
var bubbles;

var lives;
var counter = 3;

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
        var b = bullets.create(0, 0, "bullet");
        b.name = "bullet" + 1;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }

    // dodanie postaci
    player = game.add.sprite(game.world.centerX, 540, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    lives = game.add.group();
    for (var i = 0; i < counter; i++) {
        var l = lives.create(150 + 35*i, 43,"player").scale.setTo(0.5,0.5);
        l.name = "life" + 1;
        l.exists = false;
        l.visible = true;
    }

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

    bubble1.body.velocity.setTo(100, 200);
    bubble1.body.collideWorldBounds = true;
    bubble1.body.bounce.set(1);

    bubble2.body.velocity.setTo(100, 200);
    bubble2.body.collideWorldBounds = true;
    bubble2.body.bounce.set(1);
    
    bubble3.body.velocity.setTo(100, 200);
    bubble3.body.collideWorldBounds = true;
    bubble3.body.bounce.set(1);

    bubbles = game.add.group();
    bubbles.enableBody = true;
    bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    bubbles.add(bubble1);
    bubbles.add(bubble2);
    bubbles.add(bubble3);
}
	

function update() {

    filter.update();


    // zderzenia bubbles
    game.physics.arcade.overlap(bullets, bubbles, collisionHandler, null, this);

    if (game.physics.arcade.collide(player, bubbles)) {

        counter -= 1;
        if(counter >= 0) {
            this.game.state.restart();
        }
        else {
            player.immovable = true;
            bullets.removeAll(true);
        }
        
    }

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


    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireBullet();
    }

}

function render() {
    game.debug.text("Bubble Struggle", 50, 25);
    game.debug.text("Chances: ", 50, 60);
    game.debug.text("Bubbles: " + bubbles.total, 50, 95);
    game.debug.geom(floor, "#2d2d2d");

    if (bubbles.total > 0 && counter >= 0) {
        game.debug.text("Time: " + this.game.time.totalElapsedSeconds().toFixed(2), 600, 25);
    }

    if (bubbles.total == 0) {
        this.game.debug.text("All the bubbles shot down!!!", this.game.world.centerX - 130, this.game.world.centerY);
    }

    if (counter < 0) {
        this.game.debug.text("Mission not complited! Reload the game.", this.game.world.centerX - 190, this.game.world.centerY);
    }
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

    if (bubble.width * 0.5 > 20) {

        bubble.scale.setTo(0.3, 0.3);
    }
    else {

        bubble.kill();  
        bubbles.remove(bubble);
    }
}

