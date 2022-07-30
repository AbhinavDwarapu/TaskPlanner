export interface TaskFormObj {
  name: string;
  description?: string;
  date?: Date;
  startTime?: Date;
  duration?: string;
  done?: boolean;
}

export interface TaskObj extends TaskFormObj {
  id: string;
}

export interface SettingsFormObj {
  timerMinutes: number;
  timerSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  notifications: boolean;
  volume: number;
  theme?: string;
}
