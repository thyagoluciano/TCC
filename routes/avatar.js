/**
 * Rota Avatar
 */

var AvatarModel = require('../models/avatar');

exports.list = function(req, res){
    AvatarModel.list(req, res);
};

exports.get = function(req, res){
    AvatarModel.get(req, res);
};

exports.create = function(req, res){
    AvatarModel.create(req, res);
};

exports.update = function(req, res){
    AvatarModel.update(req, res);
};

exports.delete = function(req, res){
    AvatarModel.delete(req, res);
};