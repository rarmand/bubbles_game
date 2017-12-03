// Create a new Phaser game object with a single state that has 3 functions
// option for 2D: Phaser.CANVAS
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'area', {
    preload: preload,
    create: create,
    update: update
});
 
// Called first
// to load assets like imgs, sounds
function preload() {
}
 
// Called after preload
// to draw everything, sprites, text, keys, handlers
function create() {
    
    // Create some text in the middle of the game area
    var helloText = game.add.text(400, 300, 'Hello, Phaser!', { 
        fontSize: '32px', 
        fill: '#00F' 
    });
    helloText.anchor.set(0.5, 0.5);
}
 
// Called once every frame, ideally 60 times per second
// for some input during the game, collisions, tests
function update() {
}