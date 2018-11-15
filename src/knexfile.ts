require('dotenv').config({ path: __dirname + '/../.env' });

const { env } = process;

// Default configuration for database connection
let connection = {
    port: env.DB_PORT,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    charset: 'utf8',
    timezone: 'UTC'
};

// For test environment
if (env.NODE_ENV === 'test') {
    connection = {
        ...connection,
        port: env.TEST_DB_PORT,
        host: env.TEST_DB_HOST,
        user: env.TEST_DB_USER,
        password: env.TEST_DB_PASSWORD,
        database: env.TEST_DB_NAME
    };
}

/**
 * Database configuration.
 */
module.exports = {
    connection,
    client: env.DB_CLIENT,
    migrations: {
        tableName: 'migrations',
        directory: './migrations',
        stub: './stubs/migration.stub'
    },
    seeds: {
        directory: './seeds',
        stub: './stubs/seed.stub'
    }
};
