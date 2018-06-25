 export class StudentProfileHeader {
    name: string;
    profilePic: string;
    coverPic: string;
    firstName: string;
    cityId: string;

}

export class Summary {
    description: string;
    genderMale: string;
    genderFemale: string;
    gender: number;
}

export class ProfileStrength {
    strength: number;
    facebook: string;
    github: string;
    linkedin: string;
    youtube: string;
}

export class Degree {
   degreeInfo: any[];
   interInfo: any[];
   sscInfo: any;
}

export class Skills {
    skillFinal: string[];
}

export class Interests {
    interestFinal: string[];
}

export class Hobbies {
    hobbiesNames: string[];
}
export class Interest {
    interestName: string[];
}

export class Certificates {
    certificateInfo: string[];
}

export class Projects {
    projectsInfo: string[];
}

export class Awards {
   awardsInfo: string[];
}
