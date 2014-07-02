module.exports = function(app){

    var UploadModel = app.models.upload;
    var fs = require('fs');

    var UploadController = {
        list: function(req, res){
            UploadModel.list(req, res);
        },
        get: function(req, res){
            UploadModel.get(req, res);
        },
        getByType: function(req, res){
            UploadModel.getByType(req, res);
        },
        create: function(req, res){

//            var path = '';
//            var path1 = '';
//            var tmp_path = './public/assets/uploads/' + req.body.file;
//            var tmp_path1 = './public/assets/uploads/' + req.body.atlas;
//
//            switch (req.body.type){
//                case 'mapa':
//                    path = './public/assets/mapa/' + req.body.file;
//                    path1 = './public/assets/mapa/' + req.body.atlas;
//                    break;
//                case 'enemy':
//                    path = './public/assets/sprite/enemy/' + req.body.file;
//                    path1 = './public/assets/sprite/enemy/' + req.body.atlas;
//                    break;
//                case 'hero':
//                    path = './public/assets/sprite/hero/' + req.body.file;
//                    path1 = './public/assets/sprite/hero/' + req.body.atlas;
//                    break;
//                case 'itens':
//                    path = './public/assets/sprite/itens/' + req.body.file;
//                    path1 = './public/assets/sprite/itens/' + req.body.atlas;
//                    break;
//                case 'equips':
//                    path = './public/assets/sprite/weapon/' + req.body.file;
//                    path1 = './public/assets/sprite/weapon/' + req.body.atlas;
//                    break;
//                default:
//                    path = './public/assets/images/' + req.body.file;
//                    path1 = './public/assets/images/' + req.body.atlas;
//                    break
//            }
//
//            fs.rename(tmp_path, path, function(err){
//                if(err) res.send(err);
//
//                fs.unlink(tmp_path, function(){
//                    if(err) res.send(err)
//                });
//            });
//
//            fs.rename(tmp_path1, path1, function(err){
//                if(err) res.send(err);
//
//                fs.unlink(tmp_path, function(){
//                    if(err) res.send(err)
//                });
//            });
//
//            req.body.file   = path.substring(8, path.length);
//            req.body.atlas  = path1.substring(8, path1.length);
//
//            if(req.body.type){
//                delete(req.body.atlas);
//            }

            req.body.file = '/assets/sprites/'+req.body.file;

            UploadModel.create(req, res);
        },
        upload: function(req, res){
            var tmp_path = req.files.file.path;
            var target_path = './public/assets/sprites/' + req.files.file.name;

            fs.rename(tmp_path, target_path, function(err){
                if(err) res.send(err);

                fs.unlink(tmp_path, function(){
                    if(err) res.send(err)

//                    res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
                    var data = {};
                        data.name = req.files.file.name;
                    res.send(data);
                });
            });
        },
        update: function(req, res){
            UploadModel.update(req, res);
        },
        delete: function(req, res){
            UploadModel.delete(req, res);
        }
    };

    return UploadController;
};