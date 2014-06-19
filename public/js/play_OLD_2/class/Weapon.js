(function(){
    Weapon = function(game){
        this.game = game;
        this.weaponClass;
    };

    Weapon.prototype = {
        create: function(options){
            switch (options.type){
                case 'dagger':
                    this.weaponClass = new Dagger(this.game);
                    this.weaponClass.create(options);
                break;
            }
        },

        update: function(){
            this.weaponClass.update();
        },

        render: function(){
            this.weaponClass.render();
        },

        getWeapon: function(){
            return this.weaponClass.getWeapon();
        },

        setCombat: function(combat, direction){
            this.weaponClass.setCombat(combat, direction);
        }
    }
})();