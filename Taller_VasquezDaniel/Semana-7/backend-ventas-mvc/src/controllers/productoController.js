import {
  listarProductos,
  registrarProducto,
  buscarProductoPorId,
  buscarProductosPorNombre,
  actualizarProducto,
  eliminarProducto
}
  from "../models/productoModel.js";

/*export const obtenerProductos = async (req, res) => {
  try {
    const productos = await listarProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener productos"
    });
  }
};*/

export const obtenerProductos = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (nombre !== undefined) {
      if (typeof nombre !== "string" || !nombre.trim()) {
        return res.status(400).json({
          mensaje: "Debe proporcionar un nombre válido."
        });
      }
      const productos = await buscarProductosPorNombre(nombre);
      if (productos.length === 0) {
        return res.status(404).json({
          mensaje: "No se encontraron productos."
        });
      }

      return res.status(200).json(productos);
    }

    const productos = await listarProductos();

    return res.status(200).json(productos);

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al consultar productos."
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body ?? {};

    if (
      typeof nombre !== "string" ||
      nombre.trim() === "" ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return res.status(400).json({
        mensaje: "Datos del producto inválidos"
      });
    }

    const nuevoProducto = await registrarProducto({
      nombre: nombre.trim(),
      precio,
      stock
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar producto"
    });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "ID inválido"
      });
    }

    const producto = await buscarProductoPorId(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al buscar producto"
    });
  }
};

export const modificarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, precio, stock } = req.body ?? {};

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "ID inválido"
      });
    }

    if (
      typeof nombre !== "string" ||
      nombre.trim() === "" ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return res.status(400).json({
        mensaje: "Datos del producto inválidos"
      });
    }

    const producto = await actualizarProducto(id, {
      nombre: nombre.trim(),
      precio,
      stock
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al modificar producto"
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "ID inválido"
      });
    }

    const eliminado = await eliminarProducto(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto eliminado correctamente"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar producto"
    });
  }
};

/*
export const buscarProductos = async (req, res) => {
  const { nombre } = req.query;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({
      mensaje: "Debe proporcionar un nombre para buscar."
    });
  }

  try {
    const productos = await buscarProductosPorNombre(nombre);

    if (productos.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron productos."
      });
    }

    return res.status(200).json(productos);

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al buscar productos."
    });
  }*/


