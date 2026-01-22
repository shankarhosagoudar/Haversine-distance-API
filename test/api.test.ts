import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

describe('API Endpoints', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = await buildApp({ enableSwagger: false });
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /distance', () => {
        it('should calculate distance for valid coordinates', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 51.5074, lon: -0.1278 },
                    point2: { lat: 48.8566, lon: 2.3522 }
                }
            });

            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            // distance_meters is now a formatted string
            expect(body.distance_meters).toMatch(/^[0-9,]+\.[0-9]{2}$/);
            expect(body.american_comparison).toContain('American Football fields');
            expect(body.metadata.point1).toBeDefined();
            expect(body.metadata.point2).toBeDefined();
        });

        it('should return 400 for latitude out of range', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 91, lon: 0 },
                    point2: { lat: 0, lon: 0 }
                }
            });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 for longitude out of range', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 0, lon: 181 },
                    point2: { lat: 0, lon: 0 }
                }
            });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 for missing fields', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 0 }
                }
            });

            expect(response.statusCode).toBe(400);
        });

        it('should handle coordinates with extra decimals (rounding)', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/distance',
                payload: {
                    point1: { lat: 51.50740123456, lon: -0.12780123456 },
                    point2: { lat: 48.85660123456, lon: 2.35220123456 }
                }
            });

            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            // Check that returned coords are rounded (now in metadata)
            expect(body.metadata.point1.lat).toBe(51.5074);
            expect(body.metadata.point1.lon).toBe(-0.1278);
        });
    });

    describe('GET /health', () => {
        it('should return ok status', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/health'
            });

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body)).toEqual({ status: 'ok' });
        });
    });
});
