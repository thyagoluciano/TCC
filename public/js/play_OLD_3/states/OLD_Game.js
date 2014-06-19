
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.load.tilemap('desert', 'assets/desert.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tmw_desert_spacing.png');
//    game.load.spritesheet('char', 'assets/sprite/hero/sprites_male.png', 64, 64);
    game.load.atlas('char', 'assets/sprite/hero/sprites_male.png', 'assets/sprite/hero/walkcycle.json');

}

var map, layer, sprite, marker, pathfinder, cursors;
var click = true;
var ctrl = false;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 1248, 1248);

    map = game.add.tilemap('desert');
    map.addTilesetImage('Desert', 'tiles');

    layer = map.createLayer('Ground');
    layer.resizeWorld();

    var walkables = [30];

    pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    pathfinder.setGrid(map.layers[0].data, walkables);


//    sprite = game.add.sprite(450, 80, 'char');
    sprite = game.add.sprite(450, 80, 'char');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

//    sprite.body.setSize(32, 16, 0, 10);
//    sprite.anchor.setTo(0.5, 0.5);

    sprite.animations.add('left', Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
    sprite.animations.add('right', Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
    sprite.animations.add('up', Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
    sprite.animations.add('down', Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

    // Habilita o Debug;
    sprite.debug = true;
    layer.debug = true;

    cursors = game.input.keyboard.createCursorKeys();
}


function update() {

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.mousePointer.isDown)
    {
        if(click){
            click = false;
            findPathTo(layer.getTileX(marker.x), layer.getTileY(marker.y));
        }
    }
}

function findPathTo(tilex, tiley) {

    pathfinder.setCallbackFunction(function(path) {
        path = path || [];

        var iPath = [];
        var j = 0;

        iPath[j] = {x: 0, y: 0};

//        console.log(layer.getTileX(sprite.body.x), layer.getTileX(sprite.body.y));
        for(var i = 1, ilen = path.length; i < ilen; i++) {
            map.putTile(46, path[i].x, path[i].y);
//            console.log(path[i].x, path[i].y);

            if(iPath[j].x != path[i].x){
                if(ctrl){
                    j++;
                    iPath[j] = {x: 0, y: 0};
                    ctrl = false;
                }
                iPath[j].x = path[i].x;
                iPath[j].y = path[i].y;
            }else{
                iPath[j].y = path[i].y;
                ctrl = true;
            }
        }

        movePlayer(iPath);
    });

    pathfinder.preparePathCalculation([layer.getTileX(sprite.body.x),layer.getTileY(sprite.body.y)], [tilex,tiley]);
    pathfinder.calculatePath();
}

function movePlayer(path){
    var i = 0;
    console.log(path);

    var interval = setInterval(function () {

        console.log(path[path.length-1].x);

        if(path[path.length-1].x == (layer.getTileX(sprite.body.x)) && (path[path.length-1].y) == (layer.getTileY(sprite.body.y))){
            clearInterval(interval);
            click = true;
            ctrl = 0;
            console.log('stop');
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
        }else{

            if(layer.getTileX(sprite.body.x) != path[i].x){
                console.log('Xl: ' + path[path.length-1].x, 'Xs: ' + layer.getTileX(sprite.body.x));
                sprite.body.velocity.y = 0;

                if(layer.getTileX(sprite.body.x) > path[i].x){
                    sprite.animations.play('left');
                    sprite.body.velocity.x = -100;
                }else{
                    sprite.animations.play('right');
                    sprite.body.velocity.x = 100;
                }
            }else if(layer.getTileX(sprite.body.y) != path[i].y){
                sprite.body.velocity.x = 0;
                console.log('yl: ' + path[path.length-1].y, 'ys: ' + layer.getTileY(sprite.body.y));
                if(layer.getTileY(sprite.body.y) < path[i].y){
                    sprite.animations.play('down');
                    sprite.body.velocity.y = 100;
                }else if(layer.getTileY(sprite.body.y) > path[i].y){
                    sprite.animations.play('up');
                    sprite.body.velocity.y = -100;
                    i++;
                }
            }
        }

    }, 60);
}

function render(){
    game.debug.body(sprite);
    game.debug.body(layer);
}

