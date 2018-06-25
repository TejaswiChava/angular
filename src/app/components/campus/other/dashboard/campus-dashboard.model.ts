export class GraphsData {
  name: string;
  value: number;
}

export interface CampusDriveDetails {
  name: string;
  totalEvents: number;
  inProgress: number;
  sheduled: number;
}

export interface Offer {
  numberOfStudentsPlaced: number;
  averageOffer: number;
  maximumOffer: number;
}
/**
It returns the numberof companies which are marked visited
 * @export
 * @interface Visited
 */
export interface Visited {
  totalCompanies: number;
}


export interface TotalStudentsgraduated {
  totalStudentsgraduated: number;
}

export interface CompanyPlacementData {
  compName: string;
  noOfStudents: number;
}

export interface AvgOfferGraph {
  averageComp: number;
  academic_year: number;
}
/**
 * This interface displays the model of what graphandtable data should possess
 * 
 * @export
 * @interface GraphandTableData
 */
export interface GraphandTableData {
  offer: Offer;
  visited: Visited;
  totalStudentsgraduated: TotalStudentsgraduated;
  companyPlacementData: CompanyPlacementData[];
  avgOfferGraph: AvgOfferGraph[];
}
