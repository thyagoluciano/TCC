var Player = function(usuario){

    var user = usuario;

    var getUsuario = function(){
        return usuario;
    };

    var setPosition = function(position){
        user.position.x = position.x;
        user.position.y = position.y;
    };

    var getPosition = function(){
        return user.position;
    };

    var getId = function(){
        return user._sessionId;
    }

    return {
        getId: getId,
        getUsuario: getUsuario,
        setPosition: setPosition,
        getPosition: getPosition
    };
};

exports.Player = Player;