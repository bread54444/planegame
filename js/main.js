var game;
var cursors;
var cursors2;
var cursors3;
var plane1Lost;
var plane2Lost;
const gameState = {
    score1: 0,
    score2: 0
};
window.onload = function() {
    var config = {
        
        type: Phaser.AUTO,
        width: 700,
        height: 400,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                enableBody: true,
            }
        },
        scene: [SceneLoad, SceneTitle,SceneMain, SceneOver]
    };

    
    game = new Phaser.Game(config);
}