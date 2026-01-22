/**
 * Application configuration with environment variable support
 */

interface Config {
    port: number;
    host: string;
    logLevel: string;
    nodeEnv: string;
    rateLimit: {
        max: number;
        timeWindow: number;
    };
}

function getEnvNumber(key: string, defaultValue: number): number {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new Error(`Invalid ${key}: must be a number`);
    }
    return parsed;
}

function getEnvString(key: string, defaultValue: string): string {
    return process.env[key] ?? defaultValue;
}

export const config: Config = {
    port: getEnvNumber('PORT', 3000),
    host: getEnvString('HOST', '0.0.0.0'),
    logLevel: getEnvString('LOG_LEVEL', 'info'),
    nodeEnv: getEnvString('NODE_ENV', 'development'),
    rateLimit: {
        max: getEnvNumber('RATE_LIMIT_MAX', 10),
        timeWindow: getEnvNumber('RATE_LIMIT_WINDOW', 60000) // 1 minute
    }
};
