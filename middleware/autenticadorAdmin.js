module.exports = function(req, res, next){

    if(!req.session.usuario){
        return res.redirect('/admin');
        return next(); // Remover para funcioanr a questão do login
    }

    return next();
}