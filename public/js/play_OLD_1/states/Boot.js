var GameCtrl = {
    orientated: false
};

(function(){
    'use strict';

    GameCtrl.Boot = function(){
        this.init = false;
        this.maps;
    };

    GameCtrl.Boot.prototype = {


        preload: function(){

            this.load.tilemap('praia', 'assets/mapa/Praia.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/mapa/tilesheet.png');

            this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
            this.load.image('preloaderBar', 'assets/images/progress_bar.png');

            // Sprite do player
            this.load.spritesheet('char', 'assets/sprite/hero/sprites_male.png', 64, 64);

            // Sprite dos NPCs
            this.load.spritesheet('npc', 'assets/sprite/npc/char01.png', 32, 48);

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
