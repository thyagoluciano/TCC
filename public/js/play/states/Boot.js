var tccGame = {
    player: false,
    remotePlayer: []
};

tccGame.Boot = function(game){};

tccGame.Boot.prototype = {
    preload: function(){
        this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
        this.load.image('preloaderBar', 'assets/images/progress_bar.png');
    },

    create: function(){
        // Como o game não é multi-touch setamos para 1;
        this.input.maxPointers = 1;

        // Phaser pausa o jogo automaticamente quando perde o foco no browser, Vamos desabilitar isto.
        this.stage.disableVisibilityChange = true;

        if(this.game.device.desktop){
            this.scale.pageAlignHorizontally = true;
        }else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');
    }
};