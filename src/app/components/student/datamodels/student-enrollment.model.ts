export class Student {
        studentId: number;
        id: number;
        prefixValueId: number;
        firstName: string;
        middleName: string;
        lastName: string;
        genderValueId: number;
        dateOfBirth: Date;
        countryOfBirth: string;
        nationality: string;
        maritalStatusValueId: number;
        guardianName: string;
        studentStatusValueId: number;
        disabilityInd: string;
        allergies: string;
        aboutMe: string;
        highlights: string;
        hobbies: string;
        profBodyMembership: string;
        dreamCompany: string;
        createDatetime: Date;
        updateDatetime: Date;
        createUserId: number;
        updateUserId: number;
        offCampusInd: string;

}
// Use this datamodel for 10, 12, Project, Certificate
export class Academic {
        academicsId: number;
        studentId: number;
        instituteName: string;
        programName: string;
        catcode: number;
        scoreGrade: number;
        url: string;
        Duration: number;
        DurationtypeValueId: number;
        comment: string;
        createDatetime: Date;
        updateDatetime: Date;
        createUserId: number;
        updateUserId: number;
    }
    // TODO : Ask afzal to check the name as '10/12/result or project/certificate name' : 'program_name'

    // This datamodel is used for Degree {Primary Key : Additional Project Id }

    export class Degree {
        enrollmentId: number;
        studentId: number;
        programId: number;
        admissionNo: string;
        startDate: Date;
        actualCompletionDate: Date;
        cgpaScore: number;
        highlights: string;
        hashTag: string;
        dataVerifiedInd: string;
        createDatetime: Date;
        updateDatetime: Date;
        createUserId: number;
        updateUserId: number;
        internshipAvailInd: string;
        summProgAvailInd: string;
        placementAvailInd: string;
        planedCompletionDate: Date;
    }
