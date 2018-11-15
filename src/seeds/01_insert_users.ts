/**
 * Delete all existing entries and seed users table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export const seed = knex => {
    return knex('users').del().then(() => {
        return knex('users').insert([
            {
                name: 'Luis Cameroon',
                updated_at: new Date()
            },
            {
                name: 'John Doe',
                updated_at: new Date()
            }
        ]);
    });
};
