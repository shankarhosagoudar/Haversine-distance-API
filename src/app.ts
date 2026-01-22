import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyRateLimit from '@fastify/rate-limit';
import { registerRoutes } from './routes/index.js';
import { errorHandler } from './errors.js';
import { config } from './config.js';

export interface AppOptions extends FastifyServerOptions {
    enableSwagger?: boolean;
}

/**
 * Build and configure the Fastify application
 */
export async function buildApp(options: AppOptions = {}): Promise<FastifyInstance> {
    const { enableSwagger = true, ...fastifyOptions } = options;

    const app = Fastify({
        logger: {
            level: config.logLevel
        },
        ...fastifyOptions
    });

    // Add request ID to response headers
    app.addHook('onSend', async (request: { id: string }, reply: { header: (name: string, value: string) => void }) => {
        reply.header('X-Request-ID', request.id);
    });

    // Register rate limiting
    await app.register(fastifyRateLimit, {
        max: config.rateLimit.max,
        timeWindow: config.rateLimit.timeWindow
    });

    // Register Swagger (optional, can be disabled in tests)
    if (enableSwagger) {
        await app.register(fastifySwagger, {
            openapi: {
                info: {
                    title: 'Haversine Distance API',
                    description: 'Calculate great-circle distance between two geographic points using the Haversine formula',
                    version: '1.0.0'
                },
                servers: [{ url: `http://localhost:${config.port}` }]
            }
        });

        await app.register(fastifySwaggerUi, {
            routePrefix: '/docs'
        });
    }

    // Register custom error handler
    app.setErrorHandler(errorHandler);

    // Register routes
    await registerRoutes(app);

    return app;
}
