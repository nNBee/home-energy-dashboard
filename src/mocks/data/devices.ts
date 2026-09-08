import type {
  DeviceEnergyBreakdownResponse,
  EnergyRange,
} from '../../types/energy.ts';

export const deviceEnergyBreakdowns = {
  today: {
    range: 'today',
    devices: [
      { id: 'heat-pump', name: 'Heat Pump', consumptionKwh: 7.4 },
      { id: 'water-heater', name: 'Water Heater', consumptionKwh: 4.1 },
      { id: 'air-conditioner', name: 'Air Conditioner', consumptionKwh: 3.2 },
      { id: 'other', name: 'Other', consumptionKwh: 4 },
    ],
  },
  week: {
    range: 'week',
    devices: [
      { id: 'heat-pump', name: 'Heat Pump', consumptionKwh: 49.6 },
      { id: 'water-heater', name: 'Water Heater', consumptionKwh: 27.8 },
      { id: 'air-conditioner', name: 'Air Conditioner', consumptionKwh: 21.4 },
      { id: 'other', name: 'Other', consumptionKwh: 28 },
    ],
  },
  month: {
    range: 'month',
    devices: [
      { id: 'heat-pump', name: 'Heat Pump', consumptionKwh: 214.7 },
      { id: 'water-heater', name: 'Water Heater', consumptionKwh: 118.9 },
      { id: 'air-conditioner', name: 'Air Conditioner', consumptionKwh: 92.4 },
      { id: 'other', name: 'Other', consumptionKwh: 122.6 },
    ],
  },
} satisfies Record<EnergyRange, DeviceEnergyBreakdownResponse>;
