function Server(){}

Server.prototype = {
    setEventHandlers: function(client){
        client.on('server:diskUsage', function(){
            var disk = require('diskusage');
                disk.check('/', function(err, info){
                    var total = Math.floor(((info.total / 1000)/1000)/1000);
                    var free = Math.floor(((info.free / 1000)/1000)/1000);
                    console.log(total + 'GB');
                    console.log(free + 'GB');
                });
        });

        client.on('chat:enviaMensagem', function(data){

            console.log(data.room);

            this.broadcast.to(data.room).emit('chat:recebeMensagem', { name: data.name, msg: data.msg });
//            this.emit('chat:recebeMensagem', { name: data.name, msg: data.msg });
        });
    }
}


module.exports = Server;