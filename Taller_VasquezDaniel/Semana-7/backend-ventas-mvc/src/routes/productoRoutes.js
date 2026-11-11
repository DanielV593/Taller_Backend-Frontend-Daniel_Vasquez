import express from 'express';
import { verificarToken } from "../middlewares/verificarToken.js";
import {
    obtenerProductos,
    //buscarProductos,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    borrarProducto
}
    from '../controllers/productoController.js';

const router = express.Router();

// define the home page route
router.get("/", verificarToken, obtenerProductos);
//router.get("/buscar", verificarToken, buscarProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', modificarProducto);
router.delete("/:id", borrarProducto);

export default router;


