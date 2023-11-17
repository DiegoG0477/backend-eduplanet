const db = require("../configs/db.config");

class Material {
    constructor(titulo, uploadedBy, precio, editorial, autor, anioMaterial, numeroPaginas, descripcion, portadaLibroUrl, pdfUrl) {
        this.titulo = titulo;
        this.uploadedBy = uploadedBy;
        this.precio = precio;
        this.editorial = editorial;
        this.autor = autor;
        this.anioMaterial = anioMaterial;
        this.numeroPaginas = numeroPaginas;
        this.descripcion = descripcion;
        this.portadaLibroUrl = portadaLibroUrl;
        this.pdfUrl = pdfUrl;
    }

    static async getAll(limit, offset) {
        const sql ="SELECT * FROM materiales LIMIT ? OFFSET ?";
        const results = await db.promise().query(sql, [limit, offset]);
        return results[0];
    }

    static async getById(id) {
        const sql = "SELECT * FROM materiales WHERE id_material = ?";
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async save() {
        const uploadedAt = new Date();
        const sql = "INSERT INTO materiales(titulo, uploaded_at, uploaded_by, precio, editorial, autor, anio_material, numero_paginas, descripcion, portada_libro, pdf) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        await db.promise().query(sql, [this.titulo, uploadedAt, this.uploadedBy, this.precio, this.editorial, this.autor, this.anioMaterial, this.numeroPaginas, this.descripcion, this.portadaLibroUrl, this.pdfUrl], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    }

    static async updateById(material, id){
        const sql = "UPDATE materiales SET ? WHERE id_material = ?";
        await db.promise().query(sql, [material, id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
        // if (result.affectedRows == 0) {
        //     throw new Error("no se actualizó el usuario");
        // }
    }

    static async truncateTable(){
        const sql = "TRUNCATE TABLE materiales";
        await db.promise().query(sql,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log(results);
            }
        });
    }
}

module.exports = Material;
