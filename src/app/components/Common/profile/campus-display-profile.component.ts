import { AboutCampusService } from './../../../services/campus/profile/about-campus.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from './department-profile.model';
import { BarGraphComponent } from '../../../services/shared/bar-graph/bar-graph.component';
import { AboutCampus,
        HeaderData,
        CampusDetails
} from './campus-profile.model';
import { NgxCarousel } from 'ngx-carousel';
@Component({
  selector: 'app-company-dispaly-profile',
  templateUrl: './campus-display-profile.html',
  styleUrls: ['./campus-display-profile.component.css'],
})
export class CampusDispalyProfileComponent implements OnInit {
 
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
 
  noData: boolean;
  campusData: any = [];
  graphData: any[];
  // url: any;
  id: number;
  fb = false;
  linkdn = false;
  twiit= false;
  utube = false;
  orgSection = true;
  socialSection = true;
  socialmedia = true;
  DepartmentList = [];
  eventData: any = [];

studentsTrue: number;
graduateTrue: number;

NostudentsPlaced: number;
  NoOfCompaniesVisited: number;
  totalStudentsGraduated: number;
  highestOffer: number;
  NoOfStudents : any;
    campusType = 'Central University';
  industryType = 'IndustryType';
  brandingImage = 'brandingImage';
  logo: any;
  universityName: AboutCampus ;
  missionStatement: CampusDetails;
  campusURL: CampusDetails;
  campusName: AboutCampus;
  campusDescription: CampusDetails;
  rating = '5';
  tier = '1';
  estDate = '10/20/2001';
  companyPlacementDetails: any = [];
  avgOffer: any = [];
  driveData: any = [];
  companyJobDetail: any = [];
  slicedArray: any = [];
  final = { 'campusName': 'others', 'TotalJobsForThatCampus': 0 };
  facebook = 'facebook';
  linkedin = 'linkedin';
  twitter = 'twitter';
  youtube = 'youtube';
  organizationHeading = 'Departments';
  organizationName = 'ORGANIZATION 01';
  driveHeading = 'Drives in Progress';
  jobRoleHeading = 'JOB ROLE HISTORY';
  urls: any;
  offerDefault: boolean;
  jobDefault: boolean;
average = [
  {
    'name' : '2012',
    'value' : 1000
},
{
    'name' : '2013',
    'value' : 2000
},
{
    'name' : '2014',
    'value' : 3000
},
{
    'name' : '2015',
    'value' : 4000
},
{
    'name' : '2016',
    'value' : 5000
},
];

campus = [
  {
    'name': 'yits comssssssspany',
    'value': 108
  },

  {
      'name' : 'scora Tech',
      'value' : 30
  },
  {
      'name' : 'abjayon',
      'value' : 32
  },
  {
      'name' : 'Wipro Tech',
      'value' : 31
  },
  {
      'name' : 'others',
      'value' : 28
  }

];


    constructor(private campusProfile: AboutCampusService,
      private router: Router
    ) { }


  ngOnInit() {

    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };


    this.urls = this.router.url;
    this.urls = this.urls.split('/')[2];
    console.log('url::' + this.urls);
    this.getCampusData(this.urls);
    this.getGraphData(this.urls);
    this.getDriveData(this.urls);
  }
  /**
   *This function will fetch the company data from about
   *
   * @param {number} id
   * @memberof CompanyDispalyProfileComponent
   */
  getCampusData(id: number): void {
    this.campusProfile.getCampusProfile(id)
      .subscribe(
        (data: any[]) => {
          this.campusData = data;
          this.getHeader(this.campusData);
          this.getAboutCampus(this.campusData);
          this.DepartmentList = this.getDepartment(this.campusData.DepartmentList);
          this.getUrl(this.campusData);
        },
        (error) => console.log(error)
      );
  }


/**
 * Function for slider in profile pages
 * @param {*} evt
 * @memberof CompanyDispalyProfileComponent
 */
public carouselTileLoad(evt: any) {
 
  const len = this.carouselTileItems.length;
  if (len <= 30) {
    for (let i = len; i < len + 10; i++) {
      this.carouselTileItems.push(i);
    }
  }

}


  getGraphData(id: number): void {
    let  avgOfferData: any = [];
    let headerData: any = [];
    this.campusProfile.getCampusGraph(id)
      .subscribe(
        (response) => {
          this.graphData = response;
          avgOfferData = this.getAvgOffer(this.graphData);
          console.log('grphhhhhhhhh' + JSON.stringify(this.graphData));
          this.getAvgOfferCount(avgOfferData);
         this.companyPlacementDetails = this.getCampusJobDetails(this.graphData);
         this.getPlacementCount(this.companyPlacementDetails);
          avgOfferData = this.campusProfile.formatAvgOffer(avgOfferData);
          this.otherSlice();
          this.setAvgOffer(avgOfferData);
          this.setCompanyJobDetails(this.companyPlacementDetails);
          this.getHeaderDetails(this.graphData);
          headerData = this.campusProfile.formatHeader(this.graphData);
          this.totalStudentsGraduated = headerData.studentsGraduated;
          this.totalStudentsGraduated = this.campusProfile.companyDecide(this.totalStudentsGraduated);
          this.NostudentsPlaced = headerData.studentsPlaced;
          this.NostudentsPlaced = this.campusProfile.companyDecide(this.NostudentsPlaced);
          this.NoOfCompaniesVisited = headerData.totalVisited;
          this.NoOfCompaniesVisited = this.campusProfile.companyDecide(this.NoOfCompaniesVisited);
          this.highestOffer = headerData.highestOffer;
          this.highestOffer = this.campusProfile.companyDecide(this.highestOffer);
        },
        (error) => console.log(error)
      );
  }



  // offerDecide() {
    
  //       if (this.graphData.recurtmentDeatails[0].lastYearToatalOffers == null) {
  //         this.graphData.recurtmentDeatails[0].lastYearToatalOffers = 0;
  //       }
  //       if (this.graphData.recurtmentDeatails[0].lastYearMaximumSalary == null) {
  //         this.graphData.recurtmentDeatails[0].lastYearMaximumSalary = 0;
  //       }
  //       if (this.graphData.Interns[0].totalIntersLastYear == null) {
  //         this.graphData.Interns[0].totalIntersLastYear = 0;
  //       }
  //       if (this.graphData.campusVisited[0].lastYearTotalCampusVisited == null) {
  //         this.graphData.campusVisited[0].lastYearTotalCampusVisited = 0;
  //       }
  //       this.totalCampusRectuitment = this.graphData.recurtmentDeatails[0].lastYearToatalOffers;
  //       this.campusHire = this.graphData.recurtmentDeatails[0].lastYearMaximumSalary;
  //       this.totalnumberofinterns = this.graphData.Interns[0].totalIntersLastYear;
  //       this.highestCampusHire = this.graphData.campusVisited[0].lastYearTotalCampusVisited;
    
  //     }


getHeaderDetails(graph) {
  this.NoOfStudents = graph.offer.numberOfStudentsPlaced;
  console.log('this is no fof students' + this.NoOfStudents);
  if (this.NoOfStudents === null) {
    this.NoOfStudents = 0;
  }
  this.NoOfCompaniesVisited = graph.visited.totalCompanies;
  if (this.NoOfCompaniesVisited === null) {
    this.NoOfCompaniesVisited = 0;
  }
  this.totalStudentsGraduated = graph.totalStudentsgraduated.totalStudentsgraduated;
  if (this.totalStudentsGraduated === null) {
    this.totalStudentsGraduated = 0;
  }
  this.highestOffer = graph.offer.maximumOffer;
  if (this.highestOffer === null) {
    this.highestOffer = 0;
  }
}


getPlacementCount(placement) {
  if (placement.length === 0) {
    this.jobDefault = false;
  }else {
    this.jobDefault = true;
  }
}

getAvgOfferCount(offer) {
  if (offer.length === 0) {
    this.offerDefault = false;
  }else {
    this.offerDefault = true;
  }
}


getDriveData(id: number): void {
  this.campusProfile.getDriveDetailsCampus(id)
    .subscribe(
    (data: any[]) => {
      this.driveData = data;
      if (this.driveData.length !== 0) {
        this.noData = true;
      }
      console.log('campusdrive detailsss' + JSON.stringify(this.driveData));
    },
    (error) => console.log(error)
    );
}


  otherSlice() {
    if (this.companyPlacementDetails.length <= 9) {
      this.companyPlacementDetails = this.campusProfile.formatjobRoleDetails( this.companyPlacementDetails);
      }else {
       this.slicedArray  = this.companyPlacementDetails.slice(0, 8);
       for (let i = 9; i < this.companyPlacementDetails.length; i++ ) {
  this.final.TotalJobsForThatCampus += this.companyPlacementDetails[i].TotalJobsForThatCampus;
      }
     this.slicedArray.push(this.final);
     this.companyPlacementDetails = this.companyPlacementDetails.formatjobRoleDetails(this.slicedArray);
      }
    }

  getHeader(campusData: {}) {
    this.campusName =  this.campusData.campusName;
    this.brandingImage = this.campusData.brandingImage;
    this.logo = this.campusData.logo;
    this.universityName = this.campusData.UniversityName;
    this.campusType = this.campusData.compType;
  }

  getAboutCampus(campusData: {}) {
    this.campusURL = this.campusData.website;
    this.campusDescription = this.campusData.description;
    this.missionStatement = this.campusData.missionStatement;
    this.rating = this.campusData.rating;
    this.tier = this.campusData.Tier;
    this.estDate = this.campusData.establishedDate;
  }


  getDepartment(DepartmentList: any = []): Department[] { 
    return DepartmentList.map(function(departments: Department){
    return {name: departments.name, brandingImage: departments.brandingImage}; });
}
   getUrl(campusData: {}) {
      this.facebook = this.campusData.facebook;
      this.linkedin = this.campusData.linkedin;
      this.twitter = this.campusData.twitter;
      this.youtube = this.campusData.youtube;

      const prefix = 'https://';
      // if (this.facebook != null) {
        if (this.facebook && this.facebook.substr(0, prefix.length) !== prefix) {
          this.facebook = prefix + this.facebook;
        }
      // }
    //  if(this.linkedin != null ){
      const prefix1 = 'https://';
      if (this.linkedin && this.linkedin.substr(0, prefix1.length) !== prefix1) {
        this.linkedin = prefix1 + this.linkedin;
      }
    // }
    //  if( this.twitter != null){
      const prefix2 = 'https://';
      if (this.twitter && this.twitter.substr(0, prefix2.length) !== prefix2) {
        this.twitter = prefix2 + this.twitter;
      }
    // }
      // if( this.youtube != null){
      const prefix3 = 'https://';
      if (this.youtube && this.youtube.substr(0, prefix3.length) !== prefix3) {
        this.youtube = prefix3 + this.youtube;
      }
    // }


      if (this.facebook === '' && this.linkedin === '' && this.twitter === '' && this.youtube === '' ) {
   this.socialSection = false;
   this.socialmedia = false;
   }else {
    if (this.facebook) {
    this.fb = true;
    }
  if (this.linkedin ) {
    this.linkdn = true;
    }
  if (this.twitter ) {
    this.twiit = true;
    }
  if (this.youtube ) {
    this.utube = true;
    }
   }
    }

    getAvgOffer(jobDetails: any = []) {
      return jobDetails.avgOfferGraph;
    }
    getCampusJobDetails(jobDetails: any = []) {
    return  jobDetails.companyPlacementData;
    }
    setAvgOffer(AvgOffer: any = []) {
      this.avgOffer = AvgOffer;
    }
    setCompanyJobDetails(jobDetails: any = []) {
      this.companyJobDetail = jobDetails;
    }

}
