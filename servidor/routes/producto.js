const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productController')



router.post('/', productoController.guardarProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', productoController.actualizarProducto);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto);
module.exports = router;