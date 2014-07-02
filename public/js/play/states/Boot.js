var GameCtrl = {
    orientated: false,
    socket: io.connect('http://localhost:3000')
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

            // Over
            this.load.spritesheet('over', 'assets/sprite/hero/over.png', 64, 64);

            var _this = this;

//            $.get("http://localhost:3000/api/upload",function(data,status){
//                $.each(data, function(key, value){
//                    switch (data[key].type){
//                        case 'hero':
//                        break;
//                        case 'enemy':
//                        break;
//                        case 'equips':
//                        break;
//                        case 'itens':
//                        break;
//                        case 'mapa':
//                            _this.load.tilemap(data[key].name, data[key].atlas , null, Phaser.Tilemap.TILED_JSON);
//                            _this.load.image('tiles', data[key].file);
//                        break;
//                    }
//                });
//            });

//            // Imagens do Mapa
            this.load.tilemap('praia', 'assets/mapa/PraiaFinal.json' , null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/mapa/tilesheet.png');
//
            // Imagens do Player
            this.load.atlas('char', 'assets/sprite/hero/sprites_male.png', 'assets/sprite/hero/walkcycle.json');
            // Dagger
            this.load.atlas('dagger', 'assets/sprite/weapon/weapon_dagger.png', 'assets/sprite/weapon/dagger.json');

            // Itens
            this.load.spritesheet('itens', 'assets/sprite/itens/sprites_RPG_icons.png', 34, 34);

            // Sprite dos Inimigos
            this.load.atlas('skeleton', 'assets/sprite/enemy/skeleton_sprites.png', 'assets/sprite/enemy/enemy.json');
        },

        create: function(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 800;
            this.game.scale.maxHeight = 600;
//            this.game.scale.pageAlignHorizontally = true;
//            this.game.scale.pageAlignVertically = true;
//            this.game.scale.setScreenSize(true);


            this.game.state.start('Preloader');
        },

        update: function(){

        }
    }

})();
