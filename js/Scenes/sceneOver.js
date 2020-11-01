class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {

    }
    create() {
        this.title = this.add.image(game.config.width / 2, 50, "title");
        this.title.setDisplaySize(300, 50).setOrigin(0.5, 0.5);

        if (plane1Lost == true) {
            this.p1L = this.add.text(game.config.width / 2, game.config.height / 2, "PLANE 2 WON, PRESS R RESTART").setOrigin(0.5, 0.5);
        } else if (plane2Lost == true) {
            this.p2L = this.add.text(game.config.width / 2, game.config.height / 2, "PLANE 1 WON, PRESS R  TO RESTART").setOrigin(0.5, 0.5);
        } else {
            this.scene.start('SceneMain');
        }





        cursors3 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.R
        });


        this.planeT1 = this.add.image(70, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.planeT2 = this.add.image(630, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.planeT2.flipX = true;
    }

    restartGame() {
        this.scene.stop('SceneOver');
        this.scene.start('SceneMain');
    }


    update() {
        
        if (cursors3.up.isDown) {
            this.restartGame();
        }

    }

}