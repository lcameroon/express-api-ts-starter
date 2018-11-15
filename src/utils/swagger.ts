import * as path from 'path';

const { env } = process;
/**
 * Swagger definition.
 */
const swaggerDefinition = {
    info: {
        title: env.APP_NAME,
        version: env.APP_VERSION,
        description: env.APP_DESCRIPTION
    },
    basePath: '/api'
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [
        path.join(__dirname, '/../routes.js'),
        path.join(__dirname, '/../api/*.js'),
        path.join(__dirname, '/../api/**/*.yml')
    ]
};

/**
 * Initialize swagger-jsdoc.
 */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
