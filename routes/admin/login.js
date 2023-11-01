var express = require('express');
var router = express.Router();
var usersModel = require('../../models/usersModel');

router.get('/', function(req, res, next) {
    res.render('admin/login', { //login.hbs
        layout: 'admin/layout'
    });
});

router.get('/logout', function(req, res, next){
    req.session.destroy(); //destruye variables id y user
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        var user = req.body.user;
        var password = req.body.password;

        var data = await usersModel.getUserByUsernameandPassword(user, password);

        if (data != undefined) {
            req.session.id_user = data.id;
            req.session.name = data.user;
            // id y user del registro en la bd, con la que debemos conectar en las variables de sesion

            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', { // el error que experimentaba era porque la ruta estaba asi '/admin/login'. cuidado con las rutas !!
                layout: 'admin/layout',
                error: true
            });
        } 
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;