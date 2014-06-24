var Player = function( obj ){
    var CalcAttr    = require('./CalcAttr');
    var user = obj;

    var cAttr = new CalcAttr(user);

    user = cAttr.getAttr();

    var setSocketId = function(id){
        user.socketId = id;
    };

    var getId = function(){
        return user.socketId;
    };

    var getDirection = function(){
        return user.direction;
    };

    var getAnimationsDirection = function(){
        return user.animationDirection;
    };

    var getRoom = function(){
        return user.room;
    };

    var getUser = function(){
        return user;
    };

    var setDirection = function(direction){
        user.direction = direction;
    };

    var setAnimationsDirection = function(direction){
        user.animationDirection = direction;
    }

    var setPosition = function(position){
        user.position.x = position.x;
        user.position.y = position.y;
    }

    var setFrame = function(frame){
        user.frame = frame;
    }

    var setHp = function(value){
        user.hp = user.hp + (value)
    }

    return {
        setSocketId: setSocketId,
        getId: getId,
        getRoom: getRoom,
        getUser: getUser,
        getDirection: getDirection,
        setDirection: setDirection,
        setPosition: setPosition,
        setFrame: setFrame,
        setHp: setHp,
        setAnimationsDirection: setAnimationsDirection,
        getAnimationsDirection: getAnimationsDirection
    }
};

exports.Player = Player;

