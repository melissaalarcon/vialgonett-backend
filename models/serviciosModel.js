var pool = require('./bd');

async function getServicios() {
    var query = "select * from servicios order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function insertServicios(obj) {
    try {
        var query = "insert into servicios set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
        
    } catch (error) {
        console.log("Error en insertServicios:", error);
        throw error;
    }
}

async function deleteServicioById(id) {
    var query = "delete from servicios where id=?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getServicioById(id) {
    var query = "select * from servicios where id=?"
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarServicioById (obj, id) {
    try {
        var query = "update servicios set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
        
    } catch (error) {
    console.log("Error en modificarServicioById:", error);
    throw error;
    }
}

module.exports = { getServicios, insertServicios, deleteServicioById, getServicioById, modificarServicioById }