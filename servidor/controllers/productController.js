const Producto = require("../models/Producto");


exports.guardarProducto = (req,res)=>{
    try {
        let producto;

        producto = new Producto(req.body);
        producto.save();
        res.json({msq: 'producto agregado'});
    } catch (error) {
        console.log(error);
        res.status(500,send('Hubo un error'));
    }
}
exports.obtenerProductos = async (req,res)=>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
exports.actualizarProducto = async (req,res)=>{
    try {
        const {nombre, categoria, ubicacion, precio} = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: "No existe"});
        }
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({_id: req.params.id},producto,{new: true});
        res.json(producto);
    
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
exports.obtenerProducto = async (req,res)=>{
    try {
        
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: "No existe"});
        }
        
        res.json(producto);
    
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
exports.eliminarProducto = async (req,res)=>{
    try {
        
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: "No existe"});
        }
        await Producto.findOneAndRemove({_id: req.params.id})
        res.json({msq: 'producto eliminado'});
    
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}