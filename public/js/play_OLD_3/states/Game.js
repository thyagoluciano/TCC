(function(){
    'use strict';

    GameCtrl.Game = function(){
        this.map;
        this.layer = [];
        this.sprite;
        this.dagger;
        this.dagger1;
        this.enemy;
        this.camera;
        this.cursors;
        this.over;

        this.ataque = true;
        this.interval;
    };

    GameCtrl.Game.prototype = {

        create: function(){
            // Define a Fisica do Jogo
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            // Adiciona o Tilemap e o tileset do mapa
            this.map = this.game.add.tilemap('praia');
            this.map.addTilesetImage('Praia', 'tiles', 32, 32, 0, 0, 1);


            // Seta a Layer que tera colisão
            this.map.setCollision(24, true, 'Colisao');
            this.map.layers[3].visibility = false;

            // Cria os Layers do mapa

            this.layer[0] = this.map.createLayer('Colisao');
            this.layer[1] = this.map.createLayer('Praia');
            this.layer[2] = this.map.createLayer('Enfeites');
            this.layer[3] = this.map.createLayer('Montanhas');

            // Inimigo
            this.enemy = this.game.add.sprite(300, 200, 'skeleton', 13);

            // Hero
            this.sprite = this.game.add.sprite(450, 80, 'char');
//            this.sprite.scale.x = 0.5;
//            this.sprite.scale.y = 0.5;
//            this.sprite.anchor.setTo(0.5, 0.5);

            // Over
            this.over = this.game.add.sprite(0, 0, 'over');
            this.over.anchor.setTo(0.25, 0.15);


            this.dagger = this.game.add.sprite(0, 0, 'dagger');
            this.dagger1 = this.game.add.sprite(0, 0, 'dagger');

            this.enemy.addChild(this.dagger1);

            this.sprite.addChild(this.dagger);
            this.sprite.addChild(this.over);

            this.game.physics.enable(this.over, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.dagger, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.dagger1, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.layer[0], Phaser.Physics.ARCADE);
            this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);


//            this.enemy.debug = true;
            this.enemy.body.immovable = true;


            this.sprite.body.collideWorldBounds = true;

            // this.camera segue o Jogador
//            this.game.this.camera.follow(this.sprite);
            this.camera = {x:0, y:0, direction:'', isMoving:false};


            this.sprite.animations.add('left',      Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
            this.sprite.animations.add('right',     Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
            this.sprite.animations.add('up',        Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
            this.sprite.animations.add('down',      Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

            this.sprite.animations.add('adown',     Phaser.Animation.generateFrameNames('adown', 0, 8, '', 4), 10);
            this.sprite.animations.add('aleft',     Phaser.Animation.generateFrameNames('aleft', 0, 8, '', 4), 10);
            this.sprite.animations.add('aright',    Phaser.Animation.generateFrameNames('aright', 0, 8, '', 4), 10);
            this.sprite.animations.add('aup',       Phaser.Animation.generateFrameNames('aup', 0, 8, '', 4), 10);


            this.dagger.animations.add('adown',     Phaser.Animation.generateFrameNames('adown', 0, 8, '', 4), 10);
            this.dagger.animations.add('aleft',     Phaser.Animation.generateFrameNames('aleft', 0, 8, '', 4), 10);
            this.dagger.animations.add('aright',    Phaser.Animation.generateFrameNames('aright', 0, 8, '', 4), 10);
            this.dagger.animations.add('aup',       Phaser.Animation.generateFrameNames('aup', 0, 8, '', 4), 10);
            this.dagger.animations.add('fcombat', [0], 10);

            this.dagger1.animations.add('adown',     Phaser.Animation.generateFrameNames('adown', 0, 8, '', 4), 10);
            this.dagger1.animations.add('aleft',     Phaser.Animation.generateFrameNames('aleft', 0, 8, '', 4), 10);
            this.dagger1.animations.add('aright',    Phaser.Animation.generateFrameNames('aright', 0, 8, '', 4), 10);
            this.dagger1.animations.add('aup',       Phaser.Animation.generateFrameNames('aup', 0, 8, '', 4), 10);
            this.dagger1.animations.add('fcombat', [0], 10);

            // Animation
            this.enemy.animations.add('left',      Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
            this.enemy.animations.add('right',     Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
            this.enemy.animations.add('up',        Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
            this.enemy.animations.add('down',      Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

            this.enemy.animations.add('adown',     Phaser.Animation.generateFrameNames('adown', 0, 8, '', 4), 10);
            this.enemy.animations.add('aleft',     Phaser.Animation.generateFrameNames('aleft', 0, 8, '', 4), 10);
            this.enemy.animations.add('aright',    Phaser.Animation.generateFrameNames('aright', 0, 8, '', 4), 10);
            this.enemy.animations.add('aup',       Phaser.Animation.generateFrameNames('aup', 0, 8, '', 4), 10);


            this.layer[0].resizeWorld();
            this.layer[1].resizeWorld();
            this.layer[2].resizeWorld();
            this.layer[3].resizeWorld();
            this.layer[0].debug = true;

            this.cursors = this.game.input.keyboard.createCursorKeys();
        },



        update: function(){
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;

            if (this.cursors.left.isDown)
            {
                this.sprite.animations.play('left');
                this.dagger.animations.play('fcombat');
                this.sprite.body.velocity.x = -150;
            }
            else if (this.cursors.right.isDown)
            {
                this.sprite.animations.play('right');
                this.dagger.animations.play('fcombat');
                this.sprite.body.velocity.x = 150;
            }else if(this.cursors.up.isDown){
                this.sprite.animations.play('up');
                this.dagger.animations.play('fcombat');
                this.sprite.body.velocity.y = -150;
            }else if(this.cursors.down.isDown){
                this.sprite.animations.play('down');
                this.dagger.animations.play('fcombat');
                this.sprite.body.velocity.y = 150;
            }

            this.moveCamera();

            this.game.physics.arcade.collide(this.sprite, this.layer[0]);

            // Verifica se existe colisão entre localPlayer e Inimigos;
            this.game.physics.arcade.collide(this.sprite, this.enemy, this.AtackAnima, null, this);

            // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
            if(this.game.physics.arcade.overlap(this.over, this.enemy)){
                if(this.ataque){
                    this.ataque = false;
                    this.interval = setInterval(function(){
                        console.log('ataque');
                    }, 100);
                }

                console.log(this.ataque);
            }else{
                this.enemy.animations.stop();
                this.dagger1.animations.stop();

                clearInterval(this.interval);
                this.ataque = true;
                console.log('fugindo');

            }
        },

        // Metodo de atack;
        AtackAnima: function(){
            var spriteAtaque = 10;

            if(this.sprite.body.touching.left){
                this.sprite.animations.play('aleft', spriteAtaque, true);
                this.dagger.animations.play('aleft', spriteAtaque, true);
            }else if(this.sprite.body.touching.right){
                this.sprite.animations.play('aright', spriteAtaque, true);
                this.dagger.animations.play('aright', spriteAtaque, true);
            }else if(this.sprite.body.touching.up){
                this.sprite.animations.play('aup',spriteAtaque,true);
                this.dagger.animations.play('aup',spriteAtaque,true);
            }else if(this.sprite.body.touching.down){
                this.sprite.animations.play('adown', spriteAtaque, true);
                this.dagger.animations.play('adown', spriteAtaque, true);
            }

            if(this.enemy.body.touching.left){
                this.enemy.animations.play('aleft', 10, true);
                this.dagger1.animations.play('aleft', 10, true);
            }else if(this.enemy.body.touching.right){
                this.enemy.animations.play('aright', 10, true);
                this.dagger1.animations.play('aright', 10, true);
            }else if(this.enemy.body.touching.up){
                this.enemy.animations.play('aup', 10, true);
                this.dagger1.animations.play('aup', 10, true);
            }else if(this.enemy.body.touching.down){
                this.enemy.animations.play('adown', 10, true);
                this.dagger1.animations.play('adown', 10, true);
            }
        },

        moveCamera: function(){
            if (this.camera.isMoving)
                return;

            this.camera.isMoving = true;
            var mustMove = false;

            if (this.sprite.y > this.game.camera.y + this.game.height) {
                this.camera.y += 1;
                mustMove = true;
            }
            else if (this.sprite.y < this.game.camera.y) {
                this.camera.y -= 1;
                mustMove = true;
            }
            else if (this.sprite.x > this.game.camera.x + this.game.width) {
                this.camera.x += 1;
                mustMove = true;
            }
            else if (this.sprite.x < this.game.camera.x) {
                this.camera.x -= 1;
                mustMove = true;
            }

            if (mustMove) {
                var t = this.game.add.tween(this.game.camera).to({x:this.camera.x*this.game.width, y:this.camera.y*this.game.height}, 600);
                t.start();
                t.onComplete.add(function(){this.camera.isMoving = false;}, this);
            }
            else {
                this.camera.isMoving = false;
            }
        },

        render: function(){
            this.game.debug.body(this.over);
//            this.game.debug.body(this.sprite);
            this.game.debug.body(this.layer);
//            this.game.debug.body(this.enemy);
//            this.game.debug.body(this.dagger);
        }
    }
})();


