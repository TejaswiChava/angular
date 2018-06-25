export interface CompanySearchOutput {
    name: string;
    shortName: string;
    companyId: number;
    cityId: number;
    stateCode: string;
    regionFlag: string;
    cityName: string;
    companySizeValueId: number;
    companyTypeValueId: number;
    industryTypeValueId: number;
    internshipInd: string;
    companyType: string;
    companySize: string;
    industryType: string;
    searchName: string;
    searchShortName: string;
}

export interface CompanySearchInput {
    companyId: number;
    searchName: string;
    companySizeValueId: number;
    companyTypeValueId: number;
    industryTypeValueId: number;
    stateCode: string;
    cityId: number;
    statusValueId: number;
    regionFlag: string;
    campusId: number;
}
