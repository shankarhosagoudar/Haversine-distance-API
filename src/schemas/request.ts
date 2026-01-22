import type { FastifySchema } from 'fastify';

const coordinateSchema = {
    type: 'object',
    required: ['lat', 'lon'],
    properties: {
        lat: {
            type: 'number',
            minimum: -90,
            maximum: 90,
            description: 'Latitude (-90 to 90)'
        },
        lon: {
            type: 'number',
            minimum: -180,
            maximum: 180,
            description: 'Longitude (-180 to 180)'
        }
    },
    additionalProperties: false
} as const;

const errorResponseSchema = {
    type: 'object',
    properties: {
        error: {
            type: 'object',
            properties: {
                code: { type: 'string', description: 'Error code for programmatic handling' },
                message: { type: 'string', description: 'Human-readable error message' },
                details: { type: 'array', description: 'Validation error details' }
            },
            required: ['code', 'message']
        },
        requestId: { type: 'string', description: 'Request ID for debugging' }
    },
    required: ['error', 'requestId']
} as const;

export const distanceSchema: FastifySchema = {
    description: 'Calculate great-circle distance between two geographic points',
    tags: ['distance'],
    body: {
        type: 'object',
        required: ['point1', 'point2'],
        properties: {
            point1: coordinateSchema,
            point2: coordinateSchema
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                distance_meters: {
                    type: 'string',
                    description: 'Distance in meters, formatted with commas (e.g., "343,556.06")'
                },
                american_comparison: {
                    type: 'string',
                    description: 'Quirky comparison using American units'
                },
                metadata: {
                    type: 'object',
                    properties: {
                        point1: coordinateSchema,
                        point2: coordinateSchema
                    }
                }
            }
        },
        400: {
            description: 'Validation error',
            ...errorResponseSchema
        },
        429: {
            description: 'Rate limit exceeded',
            ...errorResponseSchema
        },
        500: {
            description: 'Internal server error',
            ...errorResponseSchema
        }
    }
};
