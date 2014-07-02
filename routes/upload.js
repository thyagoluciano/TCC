module.exports = function(app){

    var upload = app.controllers.api.upload;

    app.get('/api/upload',          upload.list);
    app.get('/api/upload/:id',      upload.get);
    app.get('/api/upload/type/:id', upload.getByType);

    app.post('/api/upload',         upload.create);
    app.post('/api/uploadFile',     upload.upload);
    app.delete('/api/upload/:id',   upload.delete);
};
