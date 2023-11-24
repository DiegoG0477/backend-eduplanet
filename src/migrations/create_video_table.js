/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    create table video(
        id_video INT UNSIGNED NOT NULL AUTO_INCREMENT,
        miniatura VARCHAR(255),
        titulo VARCHAR(50),
        descripcion TEXT,
        link VARCHAR(255),
        id_usuario INT UNSIGNED,
        id_tipo_video tinyint unsigned,
        created_by INT UNSIGNED,
        created_at DATE,
        updated_by INT UNSIGNED,
        updated_at DATE,
        deleted BOOLEAN DEFAULT FALSE,
        deleted_by INT UNSIGNED,
        deleted_at DATE,
        PRIMARY KEY (id_video),
        constraint fk_id_usuario_multimedia FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
        constraint fk_id_tipo_video FOREIGN KEY(id_tipo_video) REFERENCES tipo_video(id_tipo_video)
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE video");
};