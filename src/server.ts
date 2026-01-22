import { buildApp } from './app.js';
import { config } from './config.js';

/**
 * Application entry point with graceful shutdown handling
 */
async function main(): Promise<void> {
    const app = await buildApp();

    // Graceful shutdown handler
    const shutdown = async (signal: string) => {
        app.log.info(`Received ${signal}, shutting down gracefully...`);
        try {
            await app.close();
            app.log.info('Server closed successfully');
            process.exit(0);
        } catch (err) {
            app.log.error(err, 'Error during shutdown');
            process.exit(1);
        }
    };

    // Register signal handlers
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Start the server
    try {
        await app.listen({ port: config.port, host: config.host });
        console.log(`Server running at http://localhost:${config.port}`);
        console.log(`Swagger docs at http://localhost:${config.port}/docs`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();
