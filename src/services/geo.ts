import type { Coordinates } from '../types/index.js';

const EARTH_RADIUS_METERS = 6371e3;

/**
 * Converts degrees to radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Rounds a number to 5 decimal places
 */
export function roundTo5Decimals(value: number): number {
    return Math.round(value * 1e5) / 1e5;
}

/**
 * Calculates the great-circle distance between two points using the Haversine formula.
 * Coordinates are rounded to 5 decimal places before calculation.
 * 
 * @param point1 - First geographic coordinate (lat, lon)
 * @param point2 - Second geographic coordinate (lat, lon)
 * @returns Distance in meters
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
    // Round coordinates to 5 decimal places
    const lat1 = roundTo5Decimals(point1.lat);
    const lon1 = roundTo5Decimals(point1.lon);
    const lat2 = roundTo5Decimals(point2.lat);
    const lon2 = roundTo5Decimals(point2.lon);

    // Convert to radians
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    // Haversine formula
    const a = Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = EARTH_RADIUS_METERS * c;

    // Round to 2 decimal places for consistent output
    return Math.round(distance * 100) / 100;
}
