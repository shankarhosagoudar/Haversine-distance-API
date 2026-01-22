import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

/**
 * Structured error response format
 */
export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    requestId: string;
}

/**
 * Error codes for consistent error identification
 */
export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

/**
 * Custom error handler that transforms errors to structured format
 */
export function errorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
): void {
    const requestId = request.id;

    // Rate limit error
    if (error.statusCode === 429) {
        reply.status(429).send({
            error: {
                code: ErrorCodes.RATE_LIMITED,
                message: 'Too many requests. Please try again later.'
            },
            requestId
        } satisfies ErrorResponse);
        return;
    }

    // Validation error (JSON schema validation)
    if (error.validation) {
        reply.status(400).send({
            error: {
                code: ErrorCodes.VALIDATION_ERROR,
                message: 'Invalid request data',
                details: error.validation.map((v: { instancePath?: string; message?: string }) => ({
                    field: v.instancePath || 'body',
                    message: v.message
                }))
            },
            requestId
        } satisfies ErrorResponse);
        return;
    }

    // Not found
    if (error.statusCode === 404) {
        reply.status(404).send({
            error: {
                code: ErrorCodes.NOT_FOUND,
                message: 'Resource not found'
            },
            requestId
        } satisfies ErrorResponse);
        return;
    }

    // Log unexpected errors
    request.log.error(error);

    // Internal server error (don't expose details)
    reply.status(error.statusCode || 500).send({
        error: {
            code: ErrorCodes.INTERNAL_ERROR,
            message: 'An unexpected error occurred'
        },
        requestId
    } satisfies ErrorResponse);
}
