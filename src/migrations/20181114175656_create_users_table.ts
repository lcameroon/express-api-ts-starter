/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export const up = knex => {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNull();
        table.string('name').notNull();
    });
};

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export const down = knex => {
    return knex.schema.dropTable('users');
};
