(function(){
    'use strict';

    GameCtrl.Game = function(){
        this.map;
        this.layer;
        this.tile;
        this.localPlayer;
    };

    GameCtrl.Game.prototype = {

        create: function(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#787878';

            // Cria Mapa do Jogo
            this.map = new Map(this.game);
            this.map.create();


            // Cria  player do jogo
            this.localPlayer = new Player(this.game);
            this.localPlayer.create();
            // Camera segue o Jogador
            this.game.camera.follow(this.localPlayer.player);
        },

        update: function(){
            this.game.physics.arcade.collide(this.localPlayer.player, this.map.layer);
            this.localPlayer.update();
        },

        render: function(){
            // Debuga o Player
            this.localPlayer.render();
            // Debuga o Mapa;
            this.map.render();
        }
    };

})();