var Player = function(){

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
    }

    var getDirection = function(){
        return user.direction;
    }

    return {
        getId: getId,
        setId: setId,
        setUser: setUser,
        getUser: getUser,
        setPosition: setPosition,
        getPosition: getPosition,
        setDirection: setDirection,
        getDirection: getDirection
    };
};

exports.Player = Player;