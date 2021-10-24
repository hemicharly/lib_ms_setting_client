import winston from 'winston';

const loggerFormat = winston.format.combine(winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    winston.format.json(), winston.format.printf((info) => {
        return JSON.stringify({
            datetime: info.timestamp,
            level: info.level.toUpperCase(),
            message: info.message,
        });
    })
);

export const logger = winston.createLogger({
    format: loggerFormat,
    transports: [new winston.transports.Console()]
});

export const loggerError = (e: any) => {
    logger.error(
        JSON.stringify({
            error: e,
            stack: e.stack || null,
        })
    );
};
