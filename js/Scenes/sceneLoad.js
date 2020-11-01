class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {
        this.bar = new Bar({ scene: this, x: game.config.width / 2, y: game.config.height / 2 });
        this.load.on('progress', this.onProgress, this);
        this.progText = this.add.text(game.config.width / 2, game.config.height / 2, "0%", { color: "#000", fontSize: game.config.width / 20 })
        this.progText.setOrigin(0.5, 0.5);


        this.load.audio("mhit",["audio/mhit.wav"]);
        this.load.audio("hit", ["audio/hit.wav"]);
        this.load.audio('explosion', ["audio/explosion.wav"]);



        this.load.image("plane", "images/plane.png");
        this.load.image("bullet", "images/bullet.png");
        this.load.image("title", "images/title.png");
        this.load.image("playBtn", "images/playBtn.png");
        this.load.image("missile","images/missile.png");

    }
    onProgress(value) {
        console.log(value);
        var per = Math.floor(value * 100);
        this.progText.setText(per + "%");
        this.bar.setPercent(value);
    }

    create() {
        this.scene.start('SceneMain');
    }
}