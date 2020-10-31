class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {

    }
    create() {
        this.title = this.add.image(game.config.width / 2, 50, "title");
        this.title.setDisplaySize(300, 50).setOrigin(0.5, 0.5);

        this.playBtn = this.add.image(game.config.width / 2 - 10, this.title.y + 250, "playBtn");
        this.playBtn.setDisplaySize(200, 50)



        this.playBtn.setInteractive();
        this.playBtn.on('pointerdown', () => {
            this.tweens.add({ targets: this.playBtn, duration: 1000, scaleX: 0, scaleY: 0, yoyo: false, onComplete: this.onCompleteHandler, onCompleteParams: [this] });
            this.time.addEvent({ delay: 2000, callback: this.startGame, callbackScope: this, loop: false });



        })



        this.planeT1 = this.add.image(70, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.planeT2 = this.add.image(630, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.planeT2.flipX = true;
    }
    onCompleteHandler(tweens, targets, scope) {

        scope.text1 = scope.add.text(game.config.width / 2 - 30, 300, "*", { fontColor: 0xFFFFFF, fontSize: '90px' });
        scope.text1.alpha = 0;
        scope.tweens.add({ targets: scope.text1, duration: 1000, yoyo: false, alpha: { from: 0, to: 1 } });




    }
    startGame() {
        this.scene.stop('SceneTitle');
        this.scene.start('SceneMain');
    }
    update() {


    }

}