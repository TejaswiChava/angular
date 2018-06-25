import { Router } from '@angular/router';
import { Component, OnInit, VERSION, ViewContainerRef} from '@angular/core';
  import { StudentProfileService} from '../../../services/students/student-profile.service';
  import {BrowserModule} from '@angular/platform-browser';
import { Console } from '@angular/core/src/console';
import { StudentProfileHeader } from './student-profile.model';
import { Summary,
  ProfileStrength,
  Degree,
  Skills,
  Interests,
  Hobbies,
  Projects,
  Awards
 } from './student-profile.model';

  @Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
  })
  export class StudentProfileComponent implements OnInit {
    checkurl: any;
   urls: any;

/* variables used getPersonalData() method */
personalData: any;
name: string;
summaryDetails: StudentProfileHeader;
gender: number;
Nationality= 'INDIAN';
dobDate = '25-05-1990';
genderMale = 'MALE';
genderFemale = 'FEMALE';
dob = 'DOB';
/* End of variables used in getPersonalData() */


/* variables used getSkillData() method */
skillData: any= [];
skillfinal: Skills;
skillsfinal: any = [];
/* End of variables used in getskillData()  method*/


/*variables used in getInterestData() method */
interest: any[]= [];
intr: any;
interestFinal: Interests[] = [];
/* End of variables used in getInterestData() method */



/*  variables used for getProfileData() method  */

profileData: any= [];
hob: any;
firstName: StudentProfileHeader;
lastName: any;
middleName: any;
strength_image: any;
hobby: any[]= [];
addressData: any= [];
add: any;
addresses: any[]= [];
address1: any;
address2: any;
address3: any;
postalId: any;
cityId: StudentProfileHeader;
stateCode: any;
countryCode: any;
phone: any;


/*  end of variables used for getProfileData() method  */



/* variables used for getSocialMedia() method */

socialurls: any[]= [];
social: any;
facebook: ProfileStrength;
twitter: ProfileStrength;
youtube: ProfileStrength;
linkdin: ProfileStrength;
github: ProfileStrength;

/*  End of variables used for getSocialMedia() method */


/* variables used for getCertificate method */

certificateInfo: any[]= [];


/* end of variables for getCertificateInfo method */


   studentData: any = [] ;
        skills: any;
     hobbiesNames: Hobbies[]= [];
    profilePic: StudentProfileHeader;
    coverPic: StudentProfileHeader;
    degreeInfo: Degree[]= [];
    projectsInfo: any[]= [];
    awardsInfo: Awards[]= [];
    address: any[]= [];
    interInfo: Degree[]= [];
    sscInfo: Degree ;
    inter_instituteName: string;
    profileStrength: number;
    interestData: any= [];
degree_final: any[]= [];
    institueName: string;
    certificate_catCode: number;
     certifcate_scoreGrade: number;
    certifcate_url: string;
    certificate_duration: number;
    certificate_comment: string;
    socialUrl: any[]= [];
    summary= 'SUMMARY';
    facebook_img= '/assets/images/facebook.png';
    twitter_img = 'assets/images/twitter.png';
    youtube_img = '/assets/images/youtube_icon.png';
    linkdin_img = '/assets/images/linkedin.png';
    degreeName = 'degree Name';
    degreeCollegeName = 'degreeCollegeName';
    degreeScore = 'Score';
    degreeScoreNumber = 'degreeScoreNumber';
    degreeUniversity= 'Degree University';
    bachelorDegree = 'bachelorDegree';
    fistYear = '1stYear';
    secoundYear= '2ndYear';
    thirdYear= '3rdYear';
    fourthYear= '4thYear';
   // skills = 'skills';
    edit_img = '/assets/images/edit.png';
    certificate_icon= '/assets/images/certificate_icon.png';
    constructor(private studentProfile: StudentProfileService,   private router: Router) {}
    ngOnInit() {
    /* Data used for getting url which is passed as id to all functions*/

    this.urls = this.router.url;
    this.urls = this.urls.split('/')[2];
  /*  function calls to api subscribe methods  */
  this.getDegreeData(this.urls);
  this.getPersonalData(this.urls);
  this.getSkillData(this.urls);
    this.getInterestData(this.urls);
    this.getProfileData(this.urls);
    this.getSocialMediaInfo(this.urls);
    this.getCertificateData(this.urls, 34);
    this.getProjectsData(this.urls, 33);
    this.getAwardsData(this.urls, 35);
    this.getInterData(this.urls, 360);
    this.getSSCData(this.urls, 359);
    this.getDegreeData(this.urls);
    }
    getPersonalData(id: number): void {
      this.studentProfile.getPersonalInfo(id)
        .subscribe(
          (response: any) => {
            this.personalData = response.data[0];
            this.name = this.personalData.firstName;
            this.summaryDetails = this.personalData.aboutMe;
            this.gender = this.personalData.genderValueId;
            this.Nationality = this.personalData.nationality;
            this.dobDate = this.personalData.dateOfBirth;
          },
          (error) => console.log(error)
        );
    }
    getSkillData(id: number): void {
      this.studentProfile.getSkillInfo(id)
        .subscribe(
          (response: any[]) => {
            this.skillData = response;
            this.getSkills(response);
          },
          (error) => console.log(error)
        );
    }
getSkills(skills) {
  for ( let i = 0; i < skills.data.length; i++ ){
      this.skillfinal = skills.data[i].studentSkill.lookupValue;
      this.skillsfinal.push(this.skillfinal);
     }
}
getInterestData(id: number): void {
  this.studentProfile.getInterestInfo(id)
  .subscribe(
    (response: any[]) => {
     this.interest = response;
     this.getInterest(response);
    },
    (error) => console.log(error)
  );
}
getInterest(int) {
  for ( let i = 0; i < int.data.length; i++ ) {
    this.intr = int.data[i].studentInterest.lookupValue;
    this.interestFinal.push(this.intr);
   }
}
getProfileData(id: number): void  {
  this.studentProfile.getProfileInfo(id)
  .subscribe(
    (response: any[]) => {
      this.profileData = response;
    this.hob = this.profileData.Details.hobbies;
    this.firstName = this.profileData.Details.firstName;
    this.lastName = this.profileData.Details.lastName;
    this.middleName = this.profileData.Details.middleName;
    if (this.hob) {
    this.delimit(this.hob);
    }
    if (this.profileData.ProfilePic.length !== 0 ) {
    this.profilePic = this.profileData.ProfilePic[0].attachLocation;
    }
    if(this.profileData.CoverPic.length !== 0) {
    this.coverPic = this.profileData.CoverPic[0].attachLocation;
    }
    this.profileStrength = this.profileData.Strength;
      console.log('thi is profile strength' + this.profileStrength);
        // function to get the address
      //  this.getAddres(response);
   this.strength_image =  this.studentProfile.decideStrength(this.profileStrength);
    },
    (error) => console.log(error)
  );
}

getAddres(addr) {
this.addressData = addr;
this.address1 = this.addressData.Address.addressLine1;
this.address2 = this.addressData.Address.addressLine2;
this.address3 = this.addressData.Address.addressLine3;
this.postalId =  this.addressData.Address.addressIbfk6rel.postalCode;
this.cityId = this.addressData.Address.cityDetails.cityName;
this.stateCode = this.addressData.Address.stateCode;
this.countryCode = this.addressData.Address.countryCode;
this.phone = this.addressData.Contact.studentContactIbfk2rel.contactInfo;
}
  delimit(hob) {
    this.hobbiesNames = hob.split(',');
  }
  getSocialMediaInfo(id: number): void {
    this.studentProfile.getSocialMediaUrls(id)
    .subscribe(
      (response: any[]) => {
       this.socialurls = response;
       this.getUrls(this.socialurls);
      },
      (error) => console.log(error)
    );
  }
getUrls(urls) {
 
  for( let i = 0; i < urls.data.length; i++ ) {
    this.social = urls.data[i].attachLocation;
    const iterate = urls.data[i].attachTypeValueId;

    const prefix = 'https://';
    if (this.social.substr(0, prefix.length) !== prefix) {
      this.social = prefix + this.social;
    }

    if (iterate === 39) {
      this.linkdin = this.social;
    } else if (iterate === 38) {
      this.facebook = this.social;
    }else if (iterate === 358) {
      this.youtube = this.social;
    }else if (iterate === 42) {
      this.github = this.social;
    }else if (iterate === 31) {
      this.twitter = this.social;
    }
  }
}

  getCertificateData(id: number, catCode: number): void {
    this.studentProfile.getAdditionalInfo(id, catCode)
    .subscribe(
      (response: any[]) => {
       this.certificateInfo = response;
      },
      (error) => console.log(error)
    );
  }
getProjectsData(id: number, catCode: number): void {
  this.studentProfile.getAdditionalInfo(id, catCode)
  .subscribe(
    (response: any[]) => {
     this.projectsInfo = response;
    },
    (error) => console.log(error)
  );
}
getAwardsData(id: number, catCode: number): void {
  this.studentProfile.getAdditionalInfo(id, catCode)
  .subscribe(
    (response: any[]) => {
     this.awardsInfo = response;
    },
    (error) => console.log(error)
  );
}
getInterData(id: number, catCode: number): void {
  this.studentProfile.getAdditionalInfo(id, catCode)
  .subscribe(
    (response: any[]) => {
     this.interInfo = response;
    },
    (error) => console.log(error)
  );
}
getSSCData(id: number, catCode: number): void {
  this.studentProfile.getAdditionalInfo(id, catCode)
  .subscribe(
    (response: any[]) => {
     this.sscInfo = response[0];
    },
    (error) => console.log(error)
  );
}

getProfileStrengthData(id: number): void {
  this.studentProfile.getProfileInfo(id)
  .subscribe(
    (response: any[]) => {
     this.sscInfo =  response[0];
    },
    (error) => console.log(error)
  );
}



getDegreeData(id: number): void {
  this.studentProfile.getDegreeInfo(id)
  .subscribe(
    (response: any[]) => {
     this.degreeInfo = response;
     console.log(this.degreeInfo);
    },
    (error) => console.log(error)
  );
}

  }// end of the class
