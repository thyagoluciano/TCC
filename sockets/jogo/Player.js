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
/*
var Player = function( user ){

    var user = {};

    var setUser = function(data){
        for(var k in data ){
            user[k] = data[k];
        }
    }

    var getUser = function(){
        return user;
    };

    var setPosition = function(data){
        user.position.x = data.x;
        user.position.y = data.y;
    };

    var getPosition = function(){
        return user.position;
    };

    var setId = function(id){
        user.id = id
    }

    var getId = function(){
        return user.id;
    };

    var setDirection = function(direction){
        user.direction = direction;
    };

    var getDirection = function(){
        return user.direction;
    };

    var setFrame = function( frame ){
        user.frame = frame;
    };

    var getFrame = function(){
        return user.frame;
    };

    var getRoom = function(){
        return user.room;
    }

    return {
        getId: getId,
        setId: setId,
        setUser: setUser,
        getUser: getUser,
        setPosition: setPosition,
        getPosition: getPosition,
        setDirection: setDirection,
        getDirection: getDirection,
        setFrame: setFrame,
        getFrame: getFrame,
        getRoom: getRoom
    };
};

 exports.Player = Player;
*/

