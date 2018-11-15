import './env';
import './db';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import * as compression from 'compression';
import * as express from 'express';

import routes from './routes';
import json from './middlewares/json';
import logger, { logStream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

const { env } = process;
const APP_PORT = (env.NODE_ENV === 'test' ? env.TEST_APP_PORT : env.APP_PORT) || 3000;
const APP_HOST = env.APP_HOST || '0.0.0.0';
const app = express();

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = env.APP_NAME;
app.locals.version = env.APP_VERSION;

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use('/api', routes);

// Swagger UI
// Hack around changing URL for swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const swaggerIndexContent = fs
    .readFileSync(`${pathToSwaggerUi}/index.html`)
    .toString()
    .replace('https://petstore.swagger.io/v2/swagger.json', '/api/swagger.json');

app.get('/api/swagger/index.html', (req, res) => res.send(swaggerIndexContent));
app.get('/api/swagger', (req, res) => res.redirect('/api/swagger/index.html'));
app.use('/api/swagger', express.static(pathToSwaggerUi));

// Error Middlewares - Must be the last ones
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), APP_HOST, () => {
    logger.info(`Server started at http://${APP_HOST}:${APP_PORT}/api`);
});

export default app;
