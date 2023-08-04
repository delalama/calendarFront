
export interface Employee {
  feId: number;
  daysOff: number[];
  name: string;
}

export interface EmployeeDTO {
  feId: number;
  daysOff: number[];
  name: string;
}

export interface ScheduleData {
  scheduleDataDTOId: number | null;
  companyName: string | null;
  employees: EmployeeDTO[] | null;
  month: string | null;
}
