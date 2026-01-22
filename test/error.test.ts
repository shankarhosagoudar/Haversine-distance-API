import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

describe('Error Responses', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = await buildApp({ enableSwagger: false });
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Structured Error Format', () => {
        it('should return structured error for validation failure', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 91, lon: 0 },  // Invalid latitude
                    point2: { lat: 0, lon: 0 }
                }
            });

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body).toHaveProperty('error');
            expect(body.error).toHaveProperty('code', 'VALIDATION_ERROR');
            expect(body.error).toHaveProperty('message');
            expect(body).toHaveProperty('requestId');
        });

        it('should return structured error for missing fields', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 0 }  // Missing lon and point2
                }
            });

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body.error.code).toBe('VALIDATION_ERROR');
            expect(body.error.details).toBeDefined();
        });

        it('should include X-Request-ID header in successful response', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/health'
            });

            expect(response.statusCode).toBe(200);
            expect(response.headers['x-request-id']).toBeDefined();
        });

        it('should include X-Request-ID header in error response', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 91, lon: 0 },
                    point2: { lat: 0, lon: 0 }
                }
            });

            expect(response.statusCode).toBe(400);
            expect(response.headers['x-request-id']).toBeDefined();
        });
    });
});
