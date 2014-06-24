

//module.exports = function(io){
//    var sockets = io.sockets;
//    var util    = require("util");
//    var Player  = require("./jogo/Player.js");
//    var players = [];
//
//    sockets.on('connection', onSocketConnection);
//
//    // New Socket Connection
//    function onSocketConnection( client ){
//
////        var session = client.handshake.session,
////            usuario = session.usuario;
//
//        var usuario = {
//            "name" : "thy4goluciano",
//            "attributes" : {
//                "for" : 33,
//                "agi" : 4,
//                "vit" : 2,
//                "int" : 1,
//                "des" : 8,
//                "sor" : 99
//            },
//            equipment: {
//                weapon: {type: "dagger"},
//                torso: {},
//                legs: {},
//                head: {},
//                hands: {},
//                feet: {},
//                belt: {}
//            },
//            "gender" : "M",
//            position: {
//                x: 100,
//                y: 100
//            }
//        };
//
//        util.log("New Player has connected: " + usuario);
//
//        client.emit('connection', usuario);
//
//    };
//};