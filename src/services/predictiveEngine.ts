import {
  HourlyForecast,
  ModelComparisonMetric,
  RecommendedSlot,
  SlotLoad
} from '../types';
import {
  HOURLY_CONGESTION_FORECAST,
  MODEL_METRICS,
  HISTORICAL_DEMAND_7DAYS
} from './mockData';

export interface WaitingTimeInput {
  farmersAhead: number;
  activeCounters: number;
  avgProcessingTimeMinutes: number;
  timeOfDayHours: number;
  cropType: string;
  quantityKg: number;
}

export interface PredictionResult {
  estimatedWaitMinutes: number;
  confidenceInterval: [number, number]; // e.g. [38, 48]
  predictedLoad: SlotLoad;
  modelUsed: string;
  featuresUsed: {
    queueLength: number;
    activeCounters: number;
    effectiveThroughputPerHr: number;
    quantityWeightFactor: number;
  };
}

/**
 * Predicts waiting time using simulated Gradient Boosting Regressor heuristics.
 * Ready to be swapped with a real `fetch('/api/ml/predict_wait_time')`.
 */
export function getWaitingTimePrediction(input: WaitingTimeInput): PredictionResult {
  const {
    farmersAhead,
    activeCounters = 4,
    avgProcessingTimeMinutes = 7,
    quantityKg = 500
  } = input;

  // Counter throughput: total farmers served per minute across all active counters
  const safeCounters = Math.max(1, activeCounters);
  const baseServiceTime = avgProcessingTimeMinutes / safeCounters;

  // Heuristic adjustment for load non-linearity and crop quantity inspection time
  const quantityFactor = Math.max(0.85, Math.min(1.35, quantityKg / 600));
  const queueCongestionBuffer = farmersAhead > 10 ? 1.15 : 1.0;

  const rawMinutes = Math.round(farmersAhead * baseServiceTime * quantityFactor * queueCongestionBuffer);
  const estimatedWaitMinutes = Math.max(5, rawMinutes);

  const lowerBound = Math.max(3, Math.round(estimatedWaitMinutes * 0.88));
  const upperBound = Math.round(estimatedWaitMinutes * 1.16);

  let predictedLoad: SlotLoad = 'Low';
  if (estimatedWaitMinutes > 45) {
    predictedLoad = 'High';
  } else if (estimatedWaitMinutes > 25) {
    predictedLoad = 'Medium';
  }

  return {
    estimatedWaitMinutes,
    confidenceInterval: [lowerBound, upperBound],
    predictedLoad,
    modelUsed: 'Gradient Boosting Regressor (v1.4.2)',
    featuresUsed: {
      queueLength: farmersAhead,
      activeCounters: safeCounters,
      effectiveThroughputPerHr: Math.round((60 / avgProcessingTimeMinutes) * safeCounters),
      quantityWeightFactor: parseFloat(quantityFactor.toFixed(2))
    }
  };
}

/**
 * Generates smart slot recommendations based on expected centre workload.
 */
export function getRecommendedSlots(
  centreCurrentQueue: number,
  activeCounters: number,
  _crop: string
): RecommendedSlot[] {
  // Option 1: 10:30 AM (Low expected load, ~20 min wait, Recommended)
  // Option 2: 11:30 AM (Medium expected load, ~35 min wait)
  // Option 3: 01:00 PM (High expected load, ~60 min wait)
  return [
    {
      id: 'slot-1',
      timeString: '10:30 AM - 11:00 AM',
      expectedLoad: 'Low',
      estimatedWaitMinutes: 20,
      isRecommended: true,
      recommendedReason: 'Optimized counter allocation; lowest predicted queue delay (GBR: ~20 min)',
      availableCapacityPercent: 35
    },
    {
      id: 'slot-2',
      timeString: '11:30 AM - 12:00 PM',
      expectedLoad: 'Medium',
      estimatedWaitMinutes: 35,
      isRecommended: false,
      recommendedReason: 'Moderate inward tractor arrivals expected before noon weighbridge peak',
      availableCapacityPercent: 68
    },
    {
      id: 'slot-3',
      timeString: '01:00 PM - 01:30 PM',
      expectedLoad: 'High',
      estimatedWaitMinutes: 60,
      isRecommended: false,
      recommendedReason: 'Peak unloading shift; high truck queuing at grain moisture inspection stations',
      availableCapacityPercent: 92
    },
    {
      id: 'slot-4',
      timeString: '03:00 PM - 03:30 PM',
      expectedLoad: 'Low',
      estimatedWaitMinutes: 18,
      isRecommended: false,
      recommendedReason: 'Afternoon post-rush window with high counter availability',
      availableCapacityPercent: 28
    }
  ];
}

/**
 * Retrieves hourly congestion forecast for admin and centre management.
 */
export function getCongestionForecast(): HourlyForecast[] {
  return HOURLY_CONGESTION_FORECAST;
}

/**
 * Retrieves 7-day historical demand plus 3-day projection.
 */
export function getDemandForecast() {
  return HISTORICAL_DEMAND_7DAYS;
}

/**
 * Retrieves benchmark comparison table for SIH evaluation.
 */
export function getMLModelComparison(): ModelComparisonMetric[] {
  return MODEL_METRICS;
}
