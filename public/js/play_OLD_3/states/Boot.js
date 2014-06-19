var GameCtrl = {
    orientated: false
};

(function(){
    'use strict';

    GameCtrl.Boot = function(){
        this.init = false;
    };

    GameCtrl.Boot.prototype = {


        preload: function(){

            // Imagens do Preload
            this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
            this.load.image('preloaderBar', 'assets/images/progress_bar.png');

            // Imagens do Mapa
            this.load.tilemap('praia', 'assets/mapa/PraiaFinal.json' , null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/mapa/tilesheet.png');

            // Imagens do Player
            this.load.atlas('char', 'assets/sprite/hero/sprites_male.png', 'assets/sprite/hero/walkcycle.json');
            // Dagger
            this.load.atlas('dagger', 'assets/sprite/weapon/weapon_dagger.png', 'assets/sprite/weapon/dagger.json');

            // Over
            this.load.spritesheet('over', 'assets/sprite/hero/over.png', 64, 64);

//            // Sprite do player
//            this.load.spritesheet('char', 'assets/sprite/hero/sprites_male.png', 64, 64);
//
//            this.load.spritesheet('dagger', 'assets/sprite/weapon/WEAPON_dagger.png', 64, 64);
//
//            // Sprite dos NPCs
//            this.load.spritesheet('npc', 'assets/sprite/npc/char01.png', 32, 48);
//
//            // Sprite dos Inimigos
            this.load.atlas('skeleton', 'assets/sprite/enemy/skeleton_sprites.png', 'assets/sprite/enemy/enemy.json');
        },

        create: function(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 2080;
            this.game.scale.maxHeight = 2080;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);

            this.game.state.start('Preloader');
        },

        update: function(){

        }
    }

})();
