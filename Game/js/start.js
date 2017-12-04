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
    game.load.script("filter", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js");

}

// basic objects in game
var floor;
var cursors;
var filter;
var background;
var player;


function create() {
    
    // to center game canvas

	game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true; 
    game.stage.backgroundColor = "#D3D3D3";    

    background = game.add.sprite(0, 0);
    background.width = 800;
    background.height = 600;
    filter = game.add.filter("Marble", 800, 600);
    filter.alpha = 0.2;
    background.filters = [filter];


    // w tej części też licznik życia i czasu w górnym panelu
    // dodanie podłoża
    floor = new Phaser.Rectangle(0, 590, 800, 10);

    // dodanie postaci
    player = game.add.sprite(game.world.centerX, 540, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


}
	

function update() {

    filter.update();

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
        //fireBullet();
    }
}

function render() {
    //game.debug.geom(floor, "#2d2d2d");
    game.debug.geom(floor, "#9400D3");
}