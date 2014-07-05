(function(){
    Enemy = function(game, attr, socket){

        this.game = game;
        this.enemy = false;
        this.socket = socket.socket;
        this.id = attr.id;

        this.attr = attr;
        this.attack = true;
        this.battle = false;

        // Style
        this.style = { font: "12px Arial", fill: "#000000", align: "left"};
        this.hp;
        this.name;

        // Hero
        this.hero = false;
    };

    Enemy.prototype = {
        create: function(){

            // Inimigo
            this.enemy = this.game.add.sprite(this.attr.position.x, this.attr.position.y, 'skeleton', 13);
            this.enemy.id = this.id;
            this.enemy.name = this.attr.name;

            // Fisica
            this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);

            // Adiciona textos
            this.addText();

            // Adiciona sprites e objetos filhos do Enemy
            this.enemy.addChild(this.name);
            this.enemy.addChild(this.hp);

            // Seta o inimigo como immovable
            this.enemy.body.immovable = true;

            // Adiciona as animações do Sprite
            this.enemy.animations.add('left',      Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
            this.enemy.animations.add('right',     Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
            this.enemy.animations.add('up',        Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
            this.enemy.animations.add('down',      Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

            this.enemy.animations.add('adown',     Phaser.Animation.generateFrameNames('adown', 0, 8, '', 4), 10);
            this.enemy.animations.add('aleft',     Phaser.Animation.generateFrameNames('aleft', 0, 8, '', 4), 10);
            this.enemy.animations.add('aright',    Phaser.Animation.generateFrameNames('aright', 0, 8, '', 4), 10);
            this.enemy.animations.add('aup',       Phaser.Animation.generateFrameNames('aup', 0, 8, '', 4), 10);

            this.enemy.animations.add('death',     Phaser.Animation.generateFrameNames('death', 0, 5, '', 4), 10);
        },

        update: function(){
            this._battle();
        },

        render: function(){
            this.game.debug.body(this.enemy);
        },

        _batleAnimations: function(direction, hero){

            this.hero = hero;

            switch (direction){
                case '_left':
                    this.enemy.animations.play('aleft', this.attr.attributes.aspd, true);
                    break;
                case '_right':
                    this.enemy.animations.play('aright', this.attr.attributes.aspd, true);
                    break;
                case '_up':
                    this.enemy.animations.play('aup', this.attr.attributes.aspd, true);
                    break;
                case '_down':
                    this.enemy.animations.play('adown', this.attr.attributes.aspd, true);
                    break;
            }
        },

        addText: function(){
            this.name = this.game.add.text(0, -15, this.attr.name, this.style);
            this.hp   = this.game.add.text(0, -30, 'HP: ' + this.attr.attributes.hp, this.style);

            // Alinha o nome no centro.
            this.name.position.x = ((this.name._width / 2) * -1) + 16;
            this.hp.position.x = ((this.hp._width / 2) * -1) + 16;
        },

        battleAnimations: function(hero, remote){

            this.hero = hero;

            var direction = 'false';

            if(this.enemy.body.touching.left){
                this.enemy.animations.play('aleft', this.attr.attributes.aspd, true);
                direction = '_left';
            }else if(this.enemy.body.touching.right){
                this.enemy.animations.play('aright', this.attr.attributes.aspd, true);
                direction = '_right';
            }else if(this.enemy.body.touching.up){
                this.enemy.animations.play('aup',this.attr.attributes.aspd,true);
                direction = '_up';
            }else if(this.enemy.body.touching.down){
                this.enemy.animations.play('adown', this.attr.attributes.aspd, true);
                direction = '_down';
            }

            if(remote){
                this.socket.emit('enemy:battleAnimation', { id: this.id, heroId: this.hero.getId(), direction: direction, room: this.attr.room });
            }
        },

        _battle: function(){
            if(this.enemy.animations.currentAnim.frame == 5 || this.enemy.animations.currentAnim.frame == 11 || this.enemy.animations.currentAnim.frame == 17 || this.enemy.animations.currentAnim.frame == 23){
                if(this.attack){
                   this.attack = false;
                   this.hero.changeHP(-this.attr.attributes.atk, true);
                }
            }else{
                this.attack = true;
            }
        },

        changeHP: function(value){
            this.attr.attributes.hp = this.attr.attributes.hp + (value);
            this.hp.setText(this.attr.attributes.hp);

            this.socket.emit('enemy:changeHP', {id: this.id, hp: this.attr.attributes.hp, room: this.attr.room});

            if(this.attr.attributes.hp <= 0){
                this.death(true);
                this.hero.stop(true);
            }
        },

        death: function(remote){
            this.enemy.animations.play('death', 10, false, true);

            if(remote){
               this.socket.emit('enemy:death', {id: this.id, room: this.attr.room});
               this.socket.emit('item:drop', { position: this.attr.position, room: this.attr.room });
            }
        },

        stop: function(remote){
            this.enemy.animations.stop();
//            this.weapon.stop();

            if(remote){
                this.socket.emit('enemy:stop', {id: this.id, room: this.attr.room});
            }
        },

        getId: function(){
            return this.id;
        },

        _changeHP: function(value){
            this.attr.attributes.hp = value;
            this.hp.setText('HP: ' + this.attr.attributes.hp);
        },

        setHP: function(hp){
            this.attr.attributes.hp = hp;
            this.hp.setText('HP: ' + this.attr.attributes.hp);
        }
    };
})();