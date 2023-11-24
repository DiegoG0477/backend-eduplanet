/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    create table compra(
        id_compra INT UNSIGNED NOT NULL AUTO_INCREMENT,
        total DOUBLE NOT NULL,
        created_at DATE NOT NULL,
        updated_at DATE,
        PRIMARY KEY (id_compra)
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE compra");
};