var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');

router.get('/', async function(req, res, next) {
    var servicios = await serviciosModel.getServicios();
    res.render('admin/servicios', { //servicios.hbs
        layout: 'admin/layout',
        person: req.session.name,
        servicios
    })
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await serviciosModel.insertServicios(req.body);
            res.redirect('/admin/servicios')
        }
        else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, 
                message: '*Todos los campos son requeridos.'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, 
            message: '*No se cargo el nuevo servicio.'
        })
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await serviciosModel.deleteServicioById(id);
    res.redirect('/admin/servicios');
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    console.log("URL recibida:", req.url);
    console.log(req.params.id);
    
    var servicio = await serviciosModel.getServicioById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        servicio
    })
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        console.log(obj);

        await serviciosModel.modificarServicioById(obj, req.body.id);
        res.redirect('/admin/servicios');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, 
            message: "*No se modifico la novedad."
        })
    }
});

module.exports = router;