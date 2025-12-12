export interface BacklogData {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

export interface PerformanceData {
  name: string;
  value: number;
  color: string;
  fullLabel?: string;
  [key: string]: any;
}

export interface TrendData {
  date: string;
  backlog: number;
  successful: number;
  eligible: number;
  [key: string]: any;
}

export interface DailyTrendData {
  date: string;
  talkTime: number;
  successful: number;
  followUp: number;
  [key: string]: any;
}

export interface DailyReportItem {
  label: string;
  value: number | string;
  isTotal?: boolean;
  isHeader?: boolean;
  highlight?: boolean;
}

export interface TeamMemberPerformance {
  name: string;
  attendance: string;
  talkTimeFormatted: string;
  talkTimeMinutes: number;
  gsSuccessful: number;
  successful: number;
  totalSuccessful: number;
  attempts: number;
  followUp: number | null;
  notReachable: number;
  pending: number;
  [key: string]: any;
}

export interface CallbackData {
  id: number;
  course: string;
  email: string;
  caller: string;
  lawSikhoTime: string;
  skillArbitrageTime: string;
}

export interface LeadConversionData {
  id: number;
  shiftTiming: string;
  name: string;
  attendance: string;
  type: string; // FTE/PTE
  gsSuccessful: number;
  successful: number;
  totalSuccessful: number;
  assigned: number;
  attempted: number;
  notAttempted: number;
  attemptedPerc: number; // 0-100
  solvencyPerc: number; // 0-100
  abandoned: number;
}