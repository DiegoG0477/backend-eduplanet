const Material = require("../models/material.model");

const index = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const materials = await Material.getAll(limit, offset);

        return res.status(200).json({
            message: "lista de publicaciones",
            materials,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener los materiales",
            error: error,
        });
    }
};

const showMaterial = async (req, res) => {
    try {
        const material = await Material.getById(req.params.id);

        return res.status(200).json({
            message: "material encontrado",
            material,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener el material",
            error: error,
        });
    }
};

const uploadMaterial = async (req, res) => {
    try {
        const token = jwt.verify(req.headers.token,process.env.SECRET);
        
        const material = new Material({
            titulo: req.body.titulo,
            uploadedBy: token.id,
            precio: req.body.precio,
            editorial: req.body.editorial,
            autor: req.body.autor,
            anioMaterial: req.body.anioMaterial,
            numeroPaginas: req.body.numeroPaginas,
            descripcion: req.body.descripcion,
            portadaLibroUrl: req.body.portadaLibroUrl,
            pdfUrl: req.body.pdfUrl,
        });

        await material.save();

        return res.status(201).json({
            message: "material creado correctamente",
            material,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al crear el material",
            error: error,
        });
    }
};

const updateMaterial = async (req, res) => {
    try{
        const idMaterial = req.params.id;

        const material = {
            titulo: req.body.titulo,
            uploaded_at: req.body.uploadedAt,
            uploaded_by: req.body.uploadedBy,
            updated_at: new Date(),
            updated_by: req.body.updatedBy,
            precio: req.body.precio,
            editorial: req.body.editorial,
            autor: req.body.autor,
            year_material: req.body.anioMaterial,
            numero_paginas: req.body.numeroPaginas,
            descripcion: req.body.descripcion,
            portada_libro: req.body.portadaLibroUrl,
            pdf: req.body.pdfUrl,
        };
        
        const updatedMaterial = await Material.updateById(material, idMaterial);

        return res.status(200).json({
            message: "material actualizado correctamente",
            updatedMaterial,
        });

    }catch(error){
        return res.status(500).json({
            message: "error al actualizar el material",
            error: error,
        });
    };
};

module.exports = {
    index,
    showMaterial,
    createMaterial,
    uploadMaterial,
    updateMaterial,
};