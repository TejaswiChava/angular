export class GraphModelMulti {
  name: string;
  series: Single[];
}

export class Single {
  name: string;
  value: any;
}

export interface DataTables {
  row: any;
  column: any;
}

export interface JobRoleSummary {
  totalJobs: number;
  openPostions: number;
  postionsFilled: number;
  shortlisted: number;
  totalStudentsInvolved: number;
  averageComp: number;
  jobRoleName: string;
}

export interface CompanyDetails {
  JobRoleSummary: JobRoleSummary[];
  totalCmpanySelected: number;
  totalCompanyCount: number;
}

export interface TotalJobRoleData {
  CompanyDetails: CompanyDetails;
}
