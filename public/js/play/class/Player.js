(function(){
    Player = function(game, user, socket){
        this.game = game;
        this.player = false;
        this.cursors;
        this.over;
        this.socket = socket.socket;

        this.storage = [];

        this.user = user;

        this.attack = true;

        // Style
        this.style = { font: "12px Arial", fill: "#000000", align: "left"};
        this.hp;
        this.name;

        // enemy
        this.enemy;

        // Equipamentos
        this.equips = [];
    };

    Player.prototype = {
        create: function(){
            // Hero
            this.player = this.game.add.sprite(this.user.position.x, this.user.position.y, 'char');
            this.player.id = this.user.socketId;
            this.player.name = this.user.name;
            this.user.hpTotal = this.user.attributes.hp;
            // Adiciona o over, para auxiliar na batalha.
            this.over = this.game.add.sprite(0, 0, 'over');
            this.over.anchor.setTo(0.25, 0.15);

            // Adiciona a Fisica nos dois sprites
            this.game.physics.enable(this.over, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            // Adiciona textos
            this.addText();

            // Adiciona sprites e objetos filhos do Player
            this.player.addChild(this.name);
            this.player.addChild(this.hp);
            this.player.addChild(this.over);

            this.addEquipPlayer();

            // Adiciona as animações do Sprite
            this.player.animations.add('left',      Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
            this.player.animations.add('right',     Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
            this.player.animations.add('up',        Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
            this.player.animations.add('down',      Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

            this.player.animations.add('dagger_down',     Phaser.Animation.generateFrameNames('dagger_down', 0, 8, '', 4), 10);
            this.player.animations.add('dagger_left',     Phaser.Animation.generateFrameNames('dagger_left', 0, 8, '', 4), 10);
            this.player.animations.add('dagger_right',    Phaser.Animation.generateFrameNames('dagger_right', 0, 8, '', 4), 10);
            this.player.animations.add('dagger_up',       Phaser.Animation.generateFrameNames('dagger_up', 0, 8, '', 4), 10);

            this.player.animations.add('death',     Phaser.Animation.generateFrameNames('death', 0, 5, '', 4), 10);

            // collideWorldBounds
            this.player.body.collideWorldBounds = true;

            // Cria o Cursos para controlar os movimentos do Player
            this.cursors = this.game.input.keyboard.createCursorKeys();
        },

        addEquipPlayer: function(){
            // Adiciona Equipamentos
            if(this.user.equipment){
                for(var k in this.user.equipment){
//                    console.log(this.user.equipment[k]);
                    var tmpEquip = new EquipFactory(this.game);
                    tmpEquip.init(this.user.equipment[k]);

                    this.equips.push(tmpEquip);
                    this.player.addChild(tmpEquip.equip.equip);
                }
            }
        },

        update: function(){
            // Movimento do jogador de acordo com a tecla pressionada
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;

            var direction = false;

            if (this.cursors.left.isDown)
            {
                this.player.animations.play('left');
                this.player.body.velocity.x = -150;

                direction = 'left';
            }
            else if (this.cursors.right.isDown)
            {
                this.player.animations.play('right');
                this.player.body.velocity.x = 150;

                direction = 'right';
            }else if(this.cursors.up.isDown){
                this.player.animations.play('up');
                this.player.body.velocity.y = -150;

                direction = 'up';
            }else if(this.cursors.down.isDown){
                this.player.animations.play('down');
                this.player.body.velocity.y = 150;

                direction = 'down';
            }

            if(direction){
                for(var k in this.equips){
                    this.equips[k].equip.equip.animations.play(direction);
                }
            }


            // Verifica se existe uma battle
            this.battle();

            // Atualiza a posição de (x, y) e o frame
            this.user.position.x = this.player.body.x;
            this.user.position.y = this.player.body.y;
            this.user.frame = this.player.animations.currentFrame.index;

            // Envia para o servidor as variaveis necessárias para movimento do personagem
            this.socket.emit('player:move', { direction: direction, position: this.user.position, frame: this.user.frame });
        },

        render: function(){
//            this.game.debug.body(this.over);
//            this.game.debug.body(this.player);
        },

        _batleAnimations: function(direction){
//            var weapon = this.user.equipment.weapon.type;
            var weapon = 'dagger';

            this.player.animations.play(weapon + direction, this.user.attributes.aspd, true);

            for(var k in this.equips){
                this.equips[k].equip.equip.animations.play(weapon + direction, this.user.attributes.aspd, true);
            }
        },

        movePlayer: function(){

            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;

            var direction = false;

            switch (this.user.direction){
                case 'left':
                    this.player.animations.play('left');
                    this.player.body.velocity.x = -150;
                    direction = 'left';
                    break;
                case 'right':
                    this.player.animations.play('right');
                    this.player.body.velocity.x = 150;
                    direction = 'right';
                    break;
                case 'up':
                    this.player.animations.play('up');
                    this.player.body.velocity.y = -150;
                    direction = 'up';
                    break;
                case 'down':
                    this.player.animations.play('down');
                    this.player.body.velocity.y = 150;
                    direction = 'down';
                    break;
            }

            if(direction){
                for(var k in this.equips){
                    this.equips[k].equip.equip.animations.play(direction);
                }
            }
        },

        addText: function(){
            this.name = this.game.add.text(0, -15, this.user.name, this.style);
            this.hp   = this.game.add.text(0, -30, 'HP: ' + this.user.attributes.hp, this.style);

            // Alinha o nome no centro.
            this.name.position.x = ((this.name._width / 2) * -1) + 16;
            this.hp.position.x = ((this.hp._width / 2) * -1) + 16;
        },

        battleAnimations: function(enemy, remote){
//            var weapon = this.user.equipment.weapon.type;
            var weapon = 'dagger';
            var direction = false;

            this.enemy = enemy;

            // Anima o player
            if(this.player.body.touching.left){
                direction = '_left';
            }else if(this.player.body.touching.right){
                direction = '_right';
            }else if(this.player.body.touching.up){
                direction = '_up';
            }else if(this.player.body.touching.down){
                direction = '_down';
            }

            this.player.animations.play(weapon + direction, this.user.attributes.aspd, true);

            if(direction){
                for(var k in this.equips){
                    this.equips[k].equip.equip.animations.play(weapon + direction, this.user.attributes.aspd, true);
                }
            }

            if(remote){
                this.socket.emit('player:battleAnimation', { direction: direction });
            }
        },

        battle: function(){
            if(this.player.animations.currentAnim.frame == 5 || this.player.animations.currentAnim.frame == 11 || this.player.animations.currentAnim.frame == 17 || this.player.animations.currentAnim.frame == 23){
                if(this.attack){
                    this.attack = false;
                    this.enemy.changeHP(-this.user.attributes.atk, true);
                }
            }else{
                this.attack = true;
            }
        },

        changeHP: function(value){

            this.user.attributes.hp = this.user.attributes.hp + (value);
            this.hp.setText(this.user.attributes.hp);

            this.socket.emit('player:changeHP', {id: this.user.id, hp: this.user.attributes.hp});

            if(this.user.attributes.hp <= 0){
                this.death(true);
                this.enemy.stop(true);
            }
        },

        death: function(remote){
            this.player.animations.play('death', 10, false, true);

            for(var k in this.equips){
                this.equips[k].equip.equip.animations.play('death', 10, false, true);
            }

            this.over.kill();

            if(remote){
                this.socket.emit('player:death', {id: this.user.id});
            }
        },

        stop: function(remote){
            this.player.animations.stop();

            for(var k in this.equips){
                this.equips[k].equip.stop()
            }

            if(remote){
                this.socket.emit('player:stop', {id: this.user.id});
            }
        },

        getId: function(){
            return this.user.id;
        },

        setDirection: function(direction){
            this.user.direction = direction;
        },

        addStorage: function(item){
            this.storage.push(item);
        },

        setHP: function(hp){
            this.user.attributes.hp = hp;
            this.hp.setText('HP: ' + this.user.attributes.hp);
        },

        getStorage: function(){
            return this.storage;
        },

        getRoom: function(){
            return this.user.room;
        },

        getHp: function(){
            return this.user.attributes.hp;
        },

        msg: function(){
            console.log('msg');
        }

    };
})();