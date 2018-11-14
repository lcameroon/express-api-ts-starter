import knexConfig from './knexfile';

const bookshelfJs = require('bookshelf');
const knexJs = require('knex');

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin([ 'virtuals', 'pagination', 'visibility' ]);

export default bookshelf;
