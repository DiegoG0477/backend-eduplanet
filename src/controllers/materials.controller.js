const Material = require("../models/material.model");
const fs = require("fs-extra")
const { uploadImage, uploadPdf } = require("../configs/cloudinary.config");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const materials = await Material.getAll(limit, offset);

        return res.status(200).json({
            message: "lista de publicaciones",
            data: materials,
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

        let portada = null
        if(req.files?.portada){
            portada = await uploadImage(req.files.portada.tempFilePath);
            await fs.unlink(req.files.portada.tempFilePath);
        } 

        let pdf = null
        if(req.files?.pdf){
            pdf = await uploadPdf(req.files.pdf.tempFilePath);
            await fs.unlink(req.files.pdf.tempFilePath);
        }

        if(!portada || !pdf){
            throw new Error("no se subieron los archivos correctamente");
        }
        
        const material = new Material({
            titulo: req.body.titulo,
            uploadedBy: token.id,
            precio: req.body.precio,
            editorial: req.body.editorial,
            autor: req.body.autor,
            anioMaterial: req.body.anioMaterial,
            numeroPaginas: req.body.numeroPaginas,
            descripcion: req.body.descripcion,
            portadaLibroUrl: portada.secure_url,
            pdfUrl: pdf.secure_url,
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
        const token = jwt.verify(req.headers.token,process.env.SECRET);
        const idMaterial = req.params.id;

        let material = {
            ...req.body,
            updated_at: new Date(),
            updated_by: token.id,
        };

        let portada = null
        if(req.files?.portada){
            portada = await uploadImage(req.files.portada.tempFilePath);
            await fs.unlink(req.files.portada.tempFilePath);

            material = {
                ...material,
                portadaLibroUrl: portada.secure_url,
            }
        } 

        let pdf = null
        if(req.files?.pdf){
            pdf = await uploadPdf(req.files.pdf.tempFilePath);
            await fs.unlink(req.files.pdf.tempFilePath);

            material = {
                ...material,
                pdfUrl: pdf.secure_url,
            }
        }
        
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