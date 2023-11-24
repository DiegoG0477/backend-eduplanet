/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    create table comentario(
        id_comentario INT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_blog INT UNSIGNED NOT NULL,
        comentario TEXT NOT NULL,
        id_usuario INT UNSIGNED NOT NULL,
        created_by INT UNSIGNED NOT NULL,
        created_at DATE,
        updated_by INT UNSIGNED,
        updated_at DATE,
        deleted BOOLEAN DEFAULT FALSE,
        deleted_at DATE,
        deleted_by INT UNSIGNED,
        PRIMARY KEY (id_comentario),
        CONSTRAINT fk_id_blog_comentario FOREIGN KEY(id_blog) REFERENCES blog(id_blog)
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE comentario");
};