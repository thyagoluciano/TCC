var Player = function( obj ){
    var user = obj;

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

    return {
        setSocketId: setSocketId,
        getId: getId,
        getRoom: getRoom,
        getUser: getUser,
        getDirection: getDirection,
        setDirection: setDirection,
        setPosition: setPosition,
        setFrame: setFrame,
        setAnimationsDirection: setAnimationsDirection,
        getAnimationsDirection: getAnimationsDirection
    }
};

exports.Player = Player;

