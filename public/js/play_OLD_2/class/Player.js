(function(){
    Player = function(game, socket, user, map){
        this.game = game;
        this.user = user;
        this.player = null;
        this.cursors = null
        this.socket = socket;
        this.weapon = null;
        this.map = map;

        // Path Finder
        this.marker;
        this.pathfinder;
        this.blocked = false;
    };

    Player.prototype = {

        create: function(){

            this.player = this.game.add.sprite(this.user.position.x, this.user.position.y, 'char');

            this.player.cameraOffset.x = 300;
            this.player.cameraOffset.y = 300;

            // Habilita a fisica
            this.game.physics.enable(this.player);

            var style = { font: "12px Arial", fill: "#000000", align: "center" };
            var text = this.game.add.text(32, 5, this.user.name, style);
                text.anchor.set(0.5);

            this.player.body.setSize(45, 55, 10, 10);
            this.player.debug = true;

            // Cria a arma
            this.weapon = new Weapon(this.game);
            this.weapon.create({type: "dagger", atack: false});

            this.player.addChild(text);
            this.player.addChild(this.weapon.weaponClass.getWeapon());

            this.player.animations.currentFrame.index = 151;

            this.player.animations.add('down', [130,131,132,133,134,135,136,137], 10);
            this.player.animations.add('left', [117,118,119,120,121,122,123,124,125], 10);
            this.player.animations.add('right', [143,144,145,146,147,148,148,150,151], 10);
            this.player.animations.add('up', [104,105,106,107,108,109,110,111], 10);

            this.player.animations.add('adown',     [182,183,184,185,186,187], 10);
            this.player.animations.add('aleft',     [169,170,171,172,173,174], 10);
            this.player.animations.add('aright',    [195,196,197,198,199,200], 10);
            this.player.animations.add('aup',       [156,157,158,159,160,161], 10);

            this.player.body.collideWorldBounds = true;

            this.cursors = this.game.input.keyboard.createCursorKeys();
        },


        update: function(){

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
                // Ativa metodo update weapon
                this.weapon.setCombat(false, 'foraDeCombat');
            }

            this.user.position.x = this.player.body.x;
            this.user.position.y = this.player.body.y;
            this.user.frame = this.player.animations.currentFrame.index;

            this.socket.emit('move player', { id: this.user.id, direction: direction, position: this.user.position, frame: this.user.frame });
        },

        movePlayer: function(){

            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;

            switch (this.user.direction){
                case 'left':
                    this.player.animations.play('left');
                    this.player.body.velocity.x = -150;
                    break;
                case 'right':
                    this.player.animations.play('right');
                    this.player.body.velocity.x = 150;
                    break;
                case 'up':
                    this.player.animations.play('up');
                    this.player.body.velocity.y = -150;
                    break;
                case 'down':
                    this.player.animations.play('down');
                    this.player.body.velocity.y = 150;
                    break;
            }
        },

        movePlayer: function(path){

            var i = 0;
            var interval = setInterval(function () {
                if(i === path.length-1){ clearInterval(interval); this.blocked = false; }

                if(this.map.layer.getTileX(this.player.body.x) > path[i].x){
                    this.player.animations.play('left');
                    this.player.body.x = path[i].x * 32;
                }else if(this.map.layer.getTileX(this.player.body.x) < path[i].x){
                    this.player.animations.play('right');
                    this.player.body.x = path[i].x * 32;
                }else{
                    if(this.map.layer.getTileY(this.player.body.y) > path[i].y){
                        this.player.animations.play('up');
                        this.player.body.y = path[i].y * 32;
                    }else if(this.map.layer.getTileY(this.player.body.y) < path[i].y){
                        this.player.animations.play('down');
                        this.player.body.y = path[i].y * 32;
                    }
                }
                ++i;
            }, 150);

        },

        getId: function(){
            return this.user.id;
        },

        setDirection: function( direction ){
            this.user.direction = direction;
        },

        getDirection: function(){
            return this.user.direction;
        },

        render: function(){
            this.game.debug.body(this.player);
            this.weapon.render();
        },

        atack: function(){

            var direction = false;

            if(this.player.body.touching.left){
                this.player.animations.play('aleft', 10, true);
                direction = "left";
            }else if(this.player.body.touching.right){
                this.player.animations.play('aright', 10, true);
                direction = "right";
            }else if(this.player.body.touching.up){
                this.player.animations.play('aup',10,true);
                direction = "up";
            }else if(this.player.body.touching.down){
                this.player.animations.play('adown', 10, true);
                direction = "down";
            }

            this.weapon.setCombat(true, direction);
        },

        getPlayer: function(){
            return this.player;
        }
    };

})();