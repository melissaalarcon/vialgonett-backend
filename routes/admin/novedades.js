var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/novedades', { //novedades.hbs
        layout: 'admin/layout',
        person: req.session.name
    });
});

module.exports = router;