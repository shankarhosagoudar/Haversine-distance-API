import { describe, it, expect } from 'vitest';
import { calculateDistance, roundTo5Decimals } from '../src/services/geo.js';

describe('roundTo5Decimals', () => {
    it('should round to 5 decimal places', () => {
        expect(roundTo5Decimals(12.123456789)).toBe(12.12346);
        expect(roundTo5Decimals(12.12345)).toBe(12.12345);
        expect(roundTo5Decimals(12.1)).toBe(12.1);
    });
});

describe('calculateDistance', () => {
    it('should return 0 for identical points', () => {
        const point = { lat: 51.5074, lon: -0.1278 };
        expect(calculateDistance(point, point)).toBe(0);
    });

    it('should calculate London to Paris distance (~343 km)', () => {
        const london = { lat: 51.5074, lon: -0.1278 };
        const paris = { lat: 48.8566, lon: 2.3522 };
        const distance = calculateDistance(london, paris);
        // Should be approximately 343 km
        expect(distance).toBeGreaterThan(340000);
        expect(distance).toBeLessThan(350000);
    });

    it('should calculate New York to Los Angeles distance (~3944 km)', () => {
        const newYork = { lat: 40.7128, lon: -74.006 };
        const losAngeles = { lat: 34.0522, lon: -118.2437 };
        const distance = calculateDistance(newYork, losAngeles);
        // Should be approximately 3944 km
        expect(distance).toBeGreaterThan(3900000);
        expect(distance).toBeLessThan(4000000);
    });

    it('should handle antipodal points', () => {
        const north = { lat: 0, lon: 0 };
        const south = { lat: 0, lon: 180 };
        const distance = calculateDistance(north, south);
        // Half of Earth's circumference ~20015 km
        expect(distance).toBeGreaterThan(20000000);
        expect(distance).toBeLessThan(20100000);
    });
});
