exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.string('pagerduty');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.dropColumn('pagerduty');
    });
};
