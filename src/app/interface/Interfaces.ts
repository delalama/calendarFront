
export interface Employee {
  id: number;
  daysOff: Date[];
}

export interface EmployeeDTO {
  feId: number;
  daysOff: number[];
  name: string;
}

export interface ScheduleData {
  employees: EmployeeDTO[];
  month: string;
}
