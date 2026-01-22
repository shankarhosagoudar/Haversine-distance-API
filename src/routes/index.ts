import type { FastifyInstance } from 'fastify';
import { distanceSchema } from '../schemas/request.js';
import { calculateDistance, roundTo5Decimals } from '../services/geo.js';
import { getAmericanComparison, formatWithCommas } from '../services/comparison.js';
import type { DistanceRequest, DistanceResponse } from '../types/index.js';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
    app.post<{ Body: DistanceRequest; Reply: DistanceResponse }>(
        '/distance',
        { schema: distanceSchema },
        async (request) => {
            const { point1, point2 } = request.body;

            const distance = calculateDistance(point1, point2);

            return {
                distance_meters: formatWithCommas(distance),
                american_comparison: getAmericanComparison(distance),
                metadata: {
                    point1: {
                        lat: roundTo5Decimals(point1.lat),
                        lon: roundTo5Decimals(point1.lon)
                    },
                    point2: {
                        lat: roundTo5Decimals(point2.lat),
                        lon: roundTo5Decimals(point2.lon)
                    }
                }
            };
        }
    );

    // Health check endpoint
    app.get('/health', async () => ({ status: 'ok' }));
}

