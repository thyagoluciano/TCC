CalcAttr = function(attr){
    this.attr = attr;
};

CalcAttr.prototype = {
    calcHP: function(){
        // Adiciona formula de calculo de HP
        var hp = [([(35 + this.attr.attributes.level*10 + this.calculaSomaNivel(this.attr.attributes.level) * 0.5)*(1 + this.attr.attributes.vit/100)] + this.getHPAdditions() )];
        this.attr.attributes.hp = Math.round(hp);
    },

    calcAspd: function(){
        // Adiciona formula de calculo de ASPD
        var aspd = 10 + (((20/99) * this.attr.attributes.agi)+((12/99) * this.attr.attributes.dex)+((8/99) * this.attr.attributes.level));
        this.attr.attributes.aspd = Math.round(aspd);
    },

    calcAtk: function(){
        // Adiciona formula de calculo de ATK
        var atk = (this.attr.attributes.str + ((this.attr.attributes.str/10)^2) + (this.attr.attributes.dex/5) + (this.attr.attributes.luk/5) + this.attr.equipment.weapon.atk);
        this.attr.attributes.atk = Math.round(atk);
    },

    calcDef: function(){
        // Adiciona formula de calculo de DEF
        this.attr.attributes.def = 10;
    },

    getAttr: function(){
        this.calcHP();
        this.calcAspd();
        this.calcAtk();
        this.calcDef();

        return this.attr;
    },

    getHPAdditions: function(){
        return (this.attr.equipment.weapon.hp + this.attr.equipment.torso.hp + this.attr.equipment.legs.hp + this.attr.equipment.head.hp + this.attr.equipment.hands.hp + this.attr.equipment.feet.hp + this.attr.equipment.belt.hp);
    },

    calculaSomaNivel: function(level){
        var somaNivel = 0;
        for(var i = level.length; i > 0; i--){
            somaNivel += i;
        }

        return somaNivel;
    }
};

module.exports = CalcAttr;