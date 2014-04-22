tccGame.Preloader = function(game){
    this.background = null;
    this.preloadBar = null;
    this.ready = false;
}


tccGame.Preloader.prototype = {
    preload: function(){
        this.background = this.add.sprite(250, 400, 'preloaderBackground');
        this.preloadBar = this.add.sprite(250, 400, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);


        // Fontes
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Player
        this.game.load.spritesheet('hero', 'assets/sprite/hero/sprites_male.png', 64, 64);

        // Weapon
        this.game.load.spritesheet('arrow', 'assets/sprite/weapon/weapon_arrow.png', 64, 64);
        this.game.load.spritesheet('bow', 'assets/sprite/weapon/weapon_bow.png', 64, 64);
        this.game.load.spritesheet('dagger', 'assets/sprite/weapon/weapon_dagger.png', 64, 64);
        this.game.load.spritesheet('shield', 'assets/sprite/weapon/weapon_shield.png', 64, 64);
        this.game.load.spritesheet('spear', 'assets/sprite/weapon/weapon_spear.png', 64, 64);
    },

    create: function(){
        this.preloadBar.cropEnable = false;
        this.state.start('MainMenu');
    }

//    ,update: function(){
//        if(this.cache.isSoundDecoded('titleMusic') && this.ready == false){
//            this.ready = true;
//            this.state.start('MainMenu');
//        }
//    }
};