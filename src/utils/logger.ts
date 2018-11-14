import * as fs from 'fs';
import * as winston from 'winston';
import { format } from 'winston';

import 'winston-daily-rotate-file';

const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: format.combine(format.colorize(), format.simple()),
            level: 'info'
        }),
        new winston.transports.File({
            format: format.combine(format.timestamp(), format.json()),
            maxFiles: 14,
            level: LOG_LEVEL,
            dirname: LOG_DIR,
            filename: '%DATE%-debug.log'
        })
    ]
});

/**
 * A writable stream for winston logger.
 */
export const logStream = {
    write(message) {
        logger.info(message.toString());
    }
};

export default logger;
