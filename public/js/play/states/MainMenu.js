tccGame.MainMenu = function(game){
    this.music      = null;
    this.playButton = null;
};

tccGame.MainMenu.prototype = {
    create: function(){
        this.backgroundColor = '#000';

        var textstyle = {
            font: '20px "arcadeclasic"',
            fill: '#fff',
            align: 'center'
        };

        this.startText = this.game.add.text(this.game.width / 2 - 100, this.game.height / 2, 'Press  ENTER  to start playing', textstyle);

        this.enterPressed=false;
    },

    update: function(){
        if(!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            this.enterPressed=true;
            this.state.start('Game');
        }
    }

};