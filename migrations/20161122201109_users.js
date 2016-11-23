exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('email');
        table.timestamps(true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
