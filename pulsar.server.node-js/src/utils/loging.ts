import { createLogger, transports, format } from 'winston';
const { combine, timestamp, simple } = format;

const logger = createLogger({
    format: combine(timestamp(), simple()),

    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combine.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;