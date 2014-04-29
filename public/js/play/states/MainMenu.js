(function(){
    'use strict';

    GameCtrl.MainMenu = function(){
        this.music = null;
        this.playButton = null;
    };

    GameCtrl.MainMenu.prototype = {
        preload: function(){

        },

        create: function(){
            this.backgroundColor = '#000';

            var textstyle = {
                font : '26px "arcadeclasic"',
                fill : '#fff',
                align : 'center'
            };
            //var textobj =
            this.startText=this.game.add.text(this.game.width / 2 - 150, this.game.height / 2, 'Press  ENTER  to start playing', textstyle);




            this.enterPressed=false;
        },

        update: function(){
            if(!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
                this.enterPressed=true;
                this.game.state.start('Game');
            }
        }
    };

})();