/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    create table blog(
        id_blog INT UNSIGNED NOT NULL AUTO_INCREMENT,
        titulo varchar(50),
        url_imagen varchar(255),
        texto_contenido text,
        created_by INT UNSIGNED,
        created_at DATE,
        updated_by INT UNSIGNED,
        updated_at DATE,
        deleted BOOLEAN DEFAULT FALSE,
        deleted_at DATE,
        deleted_by INT UNSIGNED,
        PRIMARY KEY (id_blog),
        constraint fk_id_usuario_blog FOREIGN KEY(created_by) REFERENCES usuarios(id_usuario)
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE blog");
};