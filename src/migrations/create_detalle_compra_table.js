/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    create table detalle_compra(
        id_detalle INT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_compra INT UNSIGNED,
        id_material INT UNSIGNED,
        id_usuario INT UNSIGNED,
        descuento INT,
        created_at DATE,
        created_by INT UNSIGNED,
        updated_at DATE,
        updated_by INT UNSIGNED,
        PRIMARY KEY (id_detalle),
        CONSTRAINT fk_id_usuario_compra FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        CONSTRAINT fk_id_material_compra FOREIGN KEY (id_material) REFERENCES material(id_material),
        CONSTRAINT fk_id_compra_detalle FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
    );s
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE detalle_compra");
};