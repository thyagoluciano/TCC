(function(){
    Camera = function(game, localPlayer){
        this.game = game;
        this.camera;
        this.localPlayer = localPlayer;
    };

    Camera.prototype = {

        create: function(){
            this.camera = {x:0, y:0, direction:'', isMoving:false};
        },

        update: function(){
            this.moveCamera();
        },

        render: function(){

        },

        moveCamera: function(){
            if (this.camera.isMoving)
                return;

            this.camera.isMoving = true;
            var mustMove = false;

            if (this.localPlayer.y > this.game.camera.y + this.game.height) {
                this.camera.y += 1;
                mustMove = true;
            }
            else if (this.localPlayer.y < this.game.camera.y) {
                this.camera.y -= 1;
                mustMove = true;
            }
            else if (this.localPlayer.x > this.game.camera.x + this.game.width) {
                this.camera.x += 1;
                mustMove = true;
            }
            else if (this.localPlayer.x < this.game.camera.x) {
                this.camera.x -= 1;
                mustMove = true;
            }

            if (mustMove) {
                var t = this.game.add.tween(this.game.camera).to({x:this.camera.x*this.game.width, y:this.camera.y*this.game.height}, 600);
                t.start();
                t.onComplete.add(function(){this.camera.isMoving = false;}, this);
            }
            else {
                this.camera.isMoving = false;
            }
        }
    }
})();