var GameCtrl = {
    orientated: false
};

(function(){
    'use strict';

    GameCtrl.Boot = function(){
        this.init = false;
        this.resources = new Service();
        this.maps = this.resources.getMaps('http://localhost:3000/api/map');
    };

    GameCtrl.Boot.prototype = {


        preload: function(){

            // Carrega as imagens o o json dos mapas.
            for(var i = 0; i < this.maps.length; i++){
                this.load.tilemap(this.maps[i].name, this.maps[i].file, null, Phaser.Tilemap.TILED_JSON);
                for(var j = 0; j < this.maps[i].tilesheet.length; j++){
                    this.load.image(this.maps[i].tilesheet[j].name, this.maps[i].tilesheet[j].file);
                }
            }

            this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
            this.load.image('preloaderBar', 'assets/images/progress_bar.png');

            // Sprite do player
            this.load.spritesheet('char', 'assets/sprite/hero/sprites_male.png', 64, 64);

            this.load.spritesheet('dagger', 'assets/sprite/weapon/WEAPON_dagger.png', 64, 64);

            // Sprite dos NPCs
            this.load.spritesheet('npc', 'assets/sprite/npc/char01.png', 32, 48);

            // Sprite dos Inimigos
            this.load.spritesheet('skeleton', 'assets/sprite/enemy/skeleton_sprites.png', 64, 64);

        },

        create: function(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1024;
            this.game.scale.maxHeight = 768;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
            this.game.state.start('Preloader');
        },

        update: function(){

        }
    }

})();
