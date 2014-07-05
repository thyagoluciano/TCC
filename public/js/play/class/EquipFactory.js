(function(){
    EquipFactory = function(game){
        this.game = game;
        this.equip = null;;
    }

    EquipFactory.prototype = {
        init: function(opt){
            switch (opt.spriteSheet.type){
                case 'weapon':
                    this.equip = new Dagger(this.game);
                    this.equip.create(opt);
                break;
                case 'head':
                    this.equip = new Head(this.game);
                    this.equip.create(opt);
                break;
                case 'legs':
                    this.equip = new Head(this.game);
                    this.equip.create(opt);
                    break;
                case 'torso':
                    this.equip = new Head(this.game);
                    this.equip.create(opt);
                    break;
            }

           return this.equip;
        }
    }
})();