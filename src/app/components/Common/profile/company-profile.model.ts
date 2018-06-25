export class CompanyHeaderImage {
    imageUrl: string;
    name: string;
    industryType: string;
    companyName: string;
    compType: string;
}

export class AboutCompany {
    logo: string;
    objective: string;
    websiteAddress: string;
    missionStatement: string;
}

export class Organization {
    name: string;
    brandingImage: string;
    organizationHeading: string;
}



export class Description {
    description: string;
}

export class Graph {
    companyJobDetail: Object[];
    avgOffer: Object[];
}

export class SocialMedia {
    facebook: string;
    linkedinL: string;
    twitter: string;
    youtube: string;
}

export class DriveInProgress {
    eventName: string;
}
export class FooterBanner {
    // totalNumberOfRecruitment: string;
    // totalNumberOfInterns: string;
    // maximumOffer: string;
    // numberOfDrives: string;

    totalCampusRectuitment: number;
    totalnumberofinterns: number;
    campusHire: number;
    highestCampusHire: number;
}
