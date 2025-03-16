/* src/utils/customLogger.js */
const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');

const ENV = process.env.NODE_ENV || 'development';

const envs = {
    PROD: 'production',
    DEV: 'development',
    LOCAL: 'local',
};

const isDevEnv = ENV === envs.DEV || ENV === envs.LOCAL;

const customFormat = format.printf(({ level, message, context }) => {
    let logMessage = '';
    const [mainMessage, highlightedMessage] = message.split('|||');
    
    switch (level) {
        case 'debug':
            logMessage = `${chalk.blue(`[*${context}*]`)}: ${mainMessage} ${chalk.blue(highlightedMessage)}`;
            break;
        case 'info':
            logMessage = `${chalk.green(`[*${context}*]`)}: ${mainMessage} ${chalk.green(highlightedMessage)}`;
            break;
        case 'warn':
            logMessage = `${chalk.yellow(`[*${context}*]`)}: ${mainMessage} ${chalk.yellow(highlightedMessage)}`;
            break;
        case 'error':
            logMessage = `${chalk.red(`[*${context}*]`)}: ${mainMessage} ${chalk.red(highlightedMessage)}`;
            break;
        default:
            logMessage = `[*${context}*]: ${mainMessage} ${highlightedMessage}`;
    }
    return logMessage;
});

const prodFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, context }) => {
        const [mainMessage, highlightedMessage] = message.split('|||');
        return `[*${context}* at ${timestamp}]: ${level.toUpperCase()} - ${mainMessage} ${highlightedMessage}`;
    })
);

const customLogger = createLogger({
    level: isDevEnv ? 'debug' : 'warn',
    format: isDevEnv ? customFormat : prodFormat,
    transports: [
        new transports.Console()
    ]
});

const buildMessage = (context, mainMessage, highlightedMessage = '') => ({
    context,
    message: `${mainMessage}|||${highlightedMessage}`
});

customLogger.debug = (context, mainMessage, highlightedMessage = '') => {
    if (isDevEnv) customLogger.log('debug', buildMessage(context, mainMessage, highlightedMessage));
};

customLogger.info = (context, mainMessage, highlightedMessage = '') => {
    if (isDevEnv) customLogger.log('info', buildMessage(context, mainMessage, highlightedMessage));
};

customLogger.warn = (context, mainMessage, highlightedMessage = '') => {
    customLogger.log('warn', buildMessage(context, mainMessage, highlightedMessage));
};

customLogger.error = (context, mainMessage, highlightedMessage = '') => {
    customLogger.log('error', buildMessage(context, mainMessage, highlightedMessage));
};

module.exports = customLogger;
