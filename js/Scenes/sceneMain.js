class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        //load images and sounds
        this.bar1 = new HBar({ scene: this, x: 70, y: game.config.height / 2 - 24 });
        this.bar2 = new HBar({ scene: this, x: 630, y: 170 });

    }
    create() {
        this.mhitSound = this.sound.add("mhit");
        this.hitSound = this.sound.add("hit");
        this.explosionSound = this.sound.add("explosion");
        gameState.hBar1 = 1;
        gameState.hBar2 = 1;
        this.bar1.setPercent(gameState.hBar1);
        this.bar2.setPercent(gameState.hBar2);
        // ScoreBox
        this.text1 = this.add.text(0, 0, 'Score: 0  ', {
            fontFamily: 'Audiowide'
        });
        //
        //
        this.text1.stroke = "#FF0000";
        this.text1.strokeThickness = 30;
        //  Apply the shadow to the Stroke only
        this.text1.setShadow(2, 2, "#333333", 2, true, false);
        //
        //
        this.text1.setOrigin(0.5, 0.5);
        this.text1.x = 50;
        this.text1.y = 30;

        //

        this.text2 = this.add.text(0, 0, 'Score: 0  ', {
            fontFamily: 'AudioWide'
        });
        this.text2.setOrigin(0.5, 0.5);
        this.text2.x = 650;
        this.text2.y = 30;


        //
        //
        //bullets p1
        this.bullets1 = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 15
        });
        this.missiles1 = this.physics.add.group({
            defaultKey:'missile',
            maxSize:1
        })
        /*
        bullets p2
        */
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 15
        });
        //
        this.missiles2 = this.physics.add.group({
            defaultKey:'missile',
            maxSize:1
        })

        //defining objects 
        //Players
        //this.bullet1 = this.physics.add.sprite(50, 50, "bullet");
        this.plane1 = this.physics.add.sprite(70, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.plane2 = this.physics.add.sprite(630, game.config.height / 2, 'plane').setDisplaySize(game.config.width / 8, game.config.height / 8);
        this.plane2.flipX = true;
        this.plane1.setCollideWorldBounds(true);
        this.plane2.setCollideWorldBounds(true);
        //controls

        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.X,
            right: Phaser.Input.Keyboard.KeyCodes.Z
        });

        //this.plane1.setInteractive();
        //this.plane1.on('pointerup', this.scoreUpdated1, this);
        //this.plane1.on('pointerdown', this.upScore1, this);

        // this.plane2.setInteractive();
        //this.plane2.on('pointerup', this.scoreUpdated2, this);
        // this.plane2.on('pointerdown', this.upScore2, this);
        this.plane1.setImmovable();
        this.plane2.setImmovable();
        this.createRectangles();

        // Plane 2 Bullets / Plane 1 
        this.physics.add.collider(this.plane1, this.bullets, (_plane1, bullet) => {
            bullet.destroy();
            this.cameras.main.shake(130);
            this.upScore2();
            this.scoreUpdated2();

            this.hBar1Check();
            console.log(gameState.hBar1);
            this.hitSound.play();
        });
        //PLANE @ MISSILE/ PLANE 1 
        this.physics.add.collider(this.plane1, this.missiles2, (_plane1, missile2) => {
            missile2.destroy();
            this.cameras.main.shake(200);
            this.upScore2();
            this.scoreUpdated2();
            this.missileCheck1();
            console.log(gameState.hBar1);
            this.mhitSound.play();
        });
        // Plane 1 Bullets / Plane 2 

        this.physics.add.collider(this.plane2, this.bullets1, (_plane2, bullet1) => {
            bullet1.destroy();
            this.cameras.main.shake(130);
            this.upScore1();
            this.scoreUpdated1();

            this.hBar2Check();
            console.log(gameState.hBar2);
            this.hitSound.play();
        });
//PLANE 1 MISSILE/ PLANE 2 HIT
this.physics.add.collider(this.plane2,this.missiles1,(_plane2,missile1) => {
    missile1.destroy();
    this.cameras.main.shake(200);
    this.upScore1();
    this.scoreUpdated1();

    this.missileCheck2();
    console.log(gameState.hBar2);
    this.mhitSound.play();
})


    }

    update() {
        
        //constant running loop
        //Bullet reuse Plane 2
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.x < 10) {
                    b.setActive(false);
                }
            }
        }.bind(this));
        // Bullet reuse plane 1
        this.bullets1.children.each(function(b1) {
            if (b1.active) {
                if (b1.x > 690) {
                    b1.setActive(false);
                }
            }
        }.bind(this));
        //


        //Plane1
        if (cursors2.up.isDown) {
            this.plane1.setVelocityY(-300)
            this.bar1.x = this.plane1.x
            this.bar1.y = this.plane1.y - 30;
        } else if (cursors2.down.isDown) {
            this.plane1.setVelocityY(300)
            this.bar1.x = this.plane1.x
            this.bar1.y = this.plane1.y - 20;
        } else {
            this.plane1.setVelocityY(0)
            this.bar1.x = this.plane1.x
            this.bar1.y = this.plane1.y - 30;
        }
        if (cursors2.left.isDown) {
            this.shootBullet1();

        } 
        if(cursors2.right.isDown){
            this.shootMissiles1();
        }
        ///
        //

        //Plane 2
        if (cursors.up.isDown) {
            this.plane2.setVelocityY(-300)
            this.bar2.x = this.plane2.x
            this.bar2.y = this.plane2.y - 30;
        } else if (cursors.down.isDown) {
            this.plane2.setVelocityY(300)
            this.bar2.x = this.plane2.x
            this.bar2.y = this.plane2.y - 20;
        } else {
            this.plane2.setVelocityY(0)
            this.bar1.x = this.plane1.x
            this.bar1.y = this.plane1.y - 30;
        }
        if (cursors.space.isDown) {

            this.shootBullet2();

        }
        if(cursors.shift.isDown){
            this.shootMissiles2();
        }


    }



    shootBullet1() {
        var bullet1 = this.bullets1.get(this.plane1.body.x + 70, this.plane1.body.y + 32);
        if (bullet1) {
            bullet1.setActive(true);
            bullet1.setVisible(true);
            bullet1.body.velocity.x = 500;
        }

    }
    shootMissiles1(){
        var missiles1 = this.missiles1.get(this.plane1.body.x + 70, this.plane1.body.y + 32);
        if(missiles1){
            missiles1.setActive(true);
            missiles1.setVisible(true);
            missiles1.body.velocity.x  = 1000;
        }
        console.log("Hello")
    }
    

    hBar1Check() {
        if (gameState.hBar1 > 0) {
            gameState.hBar1 -= .10000000000000000000;
            this.bar1.setPercent(gameState.hBar1);
        }
        //PLANE 1 LOST
        if (gameState.hBar1 == 0 || gameState.hBar1 < 0) {
            console.log("Plane 1 Lost");
            plane2Lost = false;
            plane1Lost = true;
            this.explosionSound.play();
            this.scene.stop('SceneMain');
            this.scene.start('SceneOver');
        }
        if (gameState.hBar1 == 0.10000000000000014) {
            gameState.hBar1 = 0.1;
        }

    }
    missileCheck1() {
        if (gameState.hBar1 > 0) {
            gameState.hBar1 -= .5000000000000000000000000000000000;
            this.bar1.setPercent(gameState.hBar1);
        }
        //PLANE 1 LOST
        if (gameState.hBar1 == 0 || gameState.hBar1 < 0) {
            console.log("Plane 1 Lost");
            plane2Lost = false;
            plane1Lost = true;
            this.explosionSound.play();
            this.scene.stop('SceneMain');
            this.scene.start('SceneOver');
        }
        if (gameState.hBar1 == 0.10000000000000014) {
            gameState.hBar1 = 0.1;
        }
    }
    scoreUpdated1() {
        this.text1.setText("Score:" + gameState.score1);
    }

    upScore1() {
        gameState.score1 += 5;
    }

    //
    // plane 2 
    hBar2Check() {
        if (gameState.hBar2 > 0) {
            gameState.hBar2 -= .100000000000000000000000;
            this.bar2.setPercent(gameState.hBar2);
        }
        //PLANE 1 LOST
        if (gameState.hBar2 == 0 || gameState.hBar2 < 0) {
            console.log("Plane 2 Lost");
            plane2Lost = true;
            plane1Lost = false;
            this.explosionSound.play();
            this.scene.stop('SceneMain');
            this.scene.start('SceneOver');
        }
        if (gameState.hBar2 == 0.10000000000000014) {
            gameState.hBar2 = 0.1;
        }

    }
    shootMissiles2(){
        var missiles2 = this.missiles2.get(this.plane2.body.x + 10, this.plane2.body.y + 32);
        if(missiles2){
            missiles2.flipX = true;
            missiles2.setActive(true);
            missiles2.setVisible(true);
            missiles2.body.velocity.x  = -1000;
        }
        console.log("Hello")
    }

    missileCheck2() {
        if (gameState.hBar2 > 0) {
            gameState.hBar2 -= .5000000000000000000000000000000000;
            this.bar2.setPercent(gameState.hBar2);
        }
        //PLANE 1 LOST
        if (gameState.hBar2 == 0 || gameState.hBar2 < 0) {
            console.log("Plane 2 Lost");
            plane2Lost = true;
            plane1Lost = false;
            this.explosionSound.play();
            this.scene.stop('SceneMain');
            this.scene.start('SceneOver');
        }
        if (gameState.hBar2 == 0.10000000000000014) {
            gameState.hBar2 = 0.1;
        }
    }
    scoreUpdated2() {
        this.text2.setText("Score:" + gameState.score2);
    }

    upScore2() {
            gameState.score2 += 5;
        }
        //
    shootBullet2() {

        var bullet = this.bullets.get(this.plane2.body.x + 10, this.plane2.body.y + 32);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = -500;
        }



    }

    createRectangles() {
        var rect = new Phaser.Geom.Rectangle(340, 5, 5, 30)
        var rect2 = new Phaser.Geom.Rectangle(340, 60, 5, 30)
        var rect3 = new Phaser.Geom.Rectangle(340, 120, 5, 30)
        var rect4 = new Phaser.Geom.Rectangle(340, 180, 5, 30)
        var rect5 = new Phaser.Geom.Rectangle(340, 240, 5, 30)
        var rect6 = new Phaser.Geom.Rectangle(340, 300, 5, 30)
        var rect7 = new Phaser.Geom.Rectangle(340, 360, 5, 30)
        var rect8 = new Phaser.Geom.Rectangle(340, 410, 5, 30)
        var graphics = this.add.graphics({ fillStyle: { color: 0xFFFFFF } });
        graphics.fillRectShape(rect);
        graphics.fillRectShape(rect2);
        graphics.fillRectShape(rect3);
        graphics.fillRectShape(rect4);
        graphics.fillRectShape(rect6);
        graphics.fillRectShape(rect7);
        graphics.fillRectShape(rect8);
        graphics.fillRectShape(rect5);
    }
}