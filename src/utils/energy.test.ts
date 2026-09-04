import { describe, expect, it } from 'vitest';
import { calculateEstimatedCost, calculatePercentageChange } from './energy';

describe('calculateEstimatedCost', () => {
  it('calculates the estimated cost from consumption and price', () => {
    expect(calculateEstimatedCost(10, 36)).toBe(360);
  });

  it('returns 0 when consumption is 0', () => {
    expect(calculateEstimatedCost(0, 36)).toBe(0);
  });
});

describe('calculatePercentageChange', () => {
  it('calculates an increase', () => {
    expect(calculatePercentageChange(12, 10)).toBe(20);
  });

  it('calculates a decrease', () => {
    expect(calculatePercentageChange(8, 10)).toBe(-20);
  });

  it('returns 0 when there is no change', () => {
    expect(calculatePercentageChange(10, 10)).toBe(0);
  });

  it('returns null when the previous value is 0', () => {
    expect(calculatePercentageChange(10, 0)).toBeNull();
  });
});
