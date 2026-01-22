/**
 * American comparison logic - converts distances to quirky American units
 */

interface ComparisonUnit {
    name: string;
    singular: string;
    meters: number;
}

const UNITS: { threshold: number; unit: ComparisonUnit }[] = [
    { threshold: 1, unit: { name: 'hot dogs', singular: 'hot dog', meters: 0.1524 } },
    { threshold: 10, unit: { name: 'fridges', singular: 'fridge', meters: 1.8 } },
    { threshold: 100, unit: { name: 'tractors', singular: 'tractor', meters: 5 } },
    { threshold: 1000, unit: { name: 'basketball courts', singular: 'basketball court', meters: 28.7 } },
    { threshold: Infinity, unit: { name: 'American Football fields', singular: 'American Football field', meters: 91.44 } }
];

/**
 * Get the appropriate comparison unit based on distance
 */
function getComparisonUnit(distanceMeters: number): ComparisonUnit {
    for (const { threshold, unit } of UNITS) {
        if (distanceMeters < threshold) {
            return unit;
        }
    }
    return UNITS[UNITS.length - 1].unit;
}

/**
 * Format a number with comma separators
 */
export function formatWithCommas(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Generate a quirky American comparison string for a distance
 */
export function getAmericanComparison(distanceMeters: number): string {
    const unit = getComparisonUnit(distanceMeters);
    const count = Math.round(distanceMeters / unit.meters);
    const formattedCount = count.toLocaleString('en-US');
    const unitName = count === 1 ? unit.singular : unit.name;

    return `This distance is as good as ${formattedCount} ${unitName} lined up!`;
}
