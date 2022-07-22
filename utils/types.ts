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
