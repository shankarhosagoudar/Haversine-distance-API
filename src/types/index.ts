/**
 * Geographic coordinate type
 */
export interface Coordinates {
    lat: number;
    lon: number;
}

/**
 * API request body for distance calculation
 */
export interface DistanceRequest {
    point1: Coordinates;
    point2: Coordinates;
}

/**
 * API response for distance calculation
 */
export interface DistanceResponse {
    distance_meters: string;  // Formatted with commas
    american_comparison: string;
    metadata: {
        point1: Coordinates;
        point2: Coordinates;
    };
}
