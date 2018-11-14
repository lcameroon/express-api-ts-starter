import * as path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

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
        path.join(__dirname, '/../docs/*.js'),
        path.join(__dirname, '/../docs/*.yml'),
        path.join(__dirname, '/../api/**/*.yml'),
        path.join(__dirname, '/../docs/*.yaml')
    ]
};

/**
 * Initialize swagger-jsdoc.
 */
let swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
