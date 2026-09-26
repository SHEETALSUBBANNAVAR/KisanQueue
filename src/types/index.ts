export type UserRole = 'landing' | 'farmer' | 'operator' | 'admin';

export type Language = 'en' | 'kn' | 'hi';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  farmerId: string; // e.g. KA-FARM-882190
  village: string;
  district: string;
  state: string;
  language: Language;
  avatarUrl?: string;
}

export type CropType = 'Rice (Paddy)' | 'Wheat' | 'Maize' | 'Ragi (Finger Millet)' | 'Toor Dal' | 'Other';

export interface ProcurementCentre {
  id: string;
  name: string;
  district: string;
  address: string;
  distanceKm: number;
  expectedLoad: 'Low' | 'Medium' | 'High';
  activeCounters: number;
  totalCounters: number;
  currentQueueLength: number;
  avgWaitMinutes: number;
  avgProcessingMinutes: number;
  todayCompleted: number;
  capacityUtilizationPercent: number;
  coordinates: { lat: number; lng: number; x: number; y: number }; // x/y percent for visual map canvas
  operatingHours: string;
  contactNumber: string;
}

export type SlotLoad = 'Low' | 'Medium' | 'High';

export interface RecommendedSlot {
  id: string;
  timeString: string;
  expectedLoad: SlotLoad;
  estimatedWaitMinutes: number;
  isRecommended: boolean;
  recommendedReason?: string;
  availableCapacityPercent: number;
}

export type QueueTokenStatus = 
  | 'BOOKED' 
  | 'WAITING' 
  | 'TURN_APPROACHING' 
  | 'NOW_SERVING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface Appointment {
  id: string;
  tokenNumber: string; // e.g. A-124
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  crop: CropType;
  bookedQuantityKg: number;
  centreId: string;
  centreName: string;
  date: string;
  timeSlot: string;
  status: QueueTokenStatus;
  createdAt: string;
  qrCodeData: string;
}

export type QualityGrade = 'Grade A (FAQ Standard)' | 'Grade B' | 'Standard' | 'Needs Re-cleaning';

export interface ProcurementRecord {
  id: string;
  appointmentId: string;
  tokenNumber: string;
  farmerId: string;
  farmerName: string;
  centreId: string;
  centreName: string;
  crop: CropType;
  bookedQuantityKg: number;
  actualQuantityKg: number;
  qualityStatus: QualityGrade;
  moisturePercent: number;
  mspRatePerQuintal: number;
  procurementAmount: number;
  completedAt: string;
  operatorId: string;
  operatorName: string;
  weighbridgeSlipNo: string;
}

export type PaymentStatus = 'PENDING' | 'INITIATED' | 'BANK_PROCESSING' | 'COMPLETED' | 'FAILED';

export interface PaymentRecord {
  id: string;
  procurementRecordId: string;
  tokenNumber: string;
  farmerId: string;
  farmerName: string;
  bankAccountMasked: string;
  ifscCode: string;
  amount: number;
  status: PaymentStatus;
  initiatedAt: string;
  completedAt?: string;
  referenceId: string;
}

export interface CentreAlert {
  id: string;
  centreId: string;
  centreName: string;
  type: 'HIGH_CONGESTION' | 'CAPACITY_ALERT' | 'PAYMENT_ALERT' | 'WEATHER_ADVISORY';
  title: string;
  message: string;
  severity: 'low' | 'warning' | 'critical';
  timestamp: string;
  actionRequired: string;
}

export interface ModelComparisonMetric {
  modelName: string;
  mae: number; // Mean Absolute Error in minutes
  rmse: number;
  r2Score: number;
  latencyMs: number;
  isChampion: boolean;
}

export interface HourlyForecast {
  hourLabel: string;
  expectedFarmers: number;
  processingCapacity: number;
  predictedLoad: 'Low' | 'Medium' | 'High';
  avgPredictedWaitMinutes: number;
}

export interface UserSession {
  role: 'farmer' | 'operator' | 'admin';
  name: string;
  identifier: string; // e.g. "FID: KA-FARM-882190" or "Operator: OP-KAR-2041" or "Directorate Admin"
  centreName?: string;
  phone?: string;
  registeredNumber?: string; // e.g. "KA-FARM-882190" (Farmer FID), "OP-KAR-2041" (Operator Bay ID), "SSO-DIR-2026"
  avatarInitials: string;
}

export type NotificationChannel = 'farmer' | 'bay' | 'sso';

export interface AppNotification {
  id: string;
  channel: NotificationChannel; // Separate channels: 'farmer' (Ravi/Farmer), 'bay' (Weighbridge Bay), 'sso' (Directorate SSO)
  recipient: string; // e.g. "Farmer Ravi Kumar", "Weighbridge Bay #2", "Directorate SSO Admin"
  registeredNumber?: string; // Specific registered number e.g. 'KA-FARM-882190' or 'OP-KAR-2041' or 'SSO-DIR-KA01'
  title: string;
  message: string;
  category: 'queue' | 'payment' | 'mandi' | 'system' | 'bay_operation' | 'sso_governance';
  timestamp: string;
  read: boolean;
  urgent?: boolean;
  actionScreen?: 'live_queue' | 'procurement_status' | 'payment_status' | 'booking' | 'operator_bay' | 'admin_command';
  actionLabel?: string;
  metadata?: {
    tokenNumber?: string;
    vehicleNumber?: string;
    bayId?: string;
    amount?: number;
    weightKg?: number;
  };
}
