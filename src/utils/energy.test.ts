import { describe, expect, it } from 'vitest';
import type { EnergyConsumptionResponse } from '../types/energy.ts';
import {
  calculateConsumptionStatistics,
  calculateEstimatedCost,
  calculatePercentageChange,
} from './energy';

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

describe('calculateConsumptionStatistics', () => {
  it('calculates total, average, and peak consumption', () => {
    const consumption = {
      range: 'today',
      data: [
        { timestamp: '2026-09-18T08:00:00.000Z', consumptionKwh: 1.2 },
        { timestamp: '2026-09-18T09:00:00.000Z', consumptionKwh: 2.6 },
        { timestamp: '2026-09-18T10:00:00.000Z', consumptionKwh: 0.8 },
      ],
    } satisfies EnergyConsumptionResponse;

    expect(calculateConsumptionStatistics(consumption)).toEqual({
      totalConsumptionKwh: 4.6,
      averageConsumptionKwh: 4.6 / 3,
      peakConsumptionKwh: 2.6,
    });
  });

  it('returns zero values for an empty dataset', () => {
    const consumption = {
      range: 'today',
      data: [],
    } satisfies EnergyConsumptionResponse;

    expect(calculateConsumptionStatistics(consumption)).toEqual({
      totalConsumptionKwh: 0,
      averageConsumptionKwh: 0,
      peakConsumptionKwh: 0,
    });
  });
});
