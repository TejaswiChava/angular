import { Component, OnInit, Directive, ViewContainerRef } from '@angular/core';
import { AboutCompanyService } from './../../../services/company/profile/about-company.service';
import { Router, ActivatedRoute    } from '@angular/router';
import { Organization,
  CompanyHeaderImage,
  AboutCompany,
  FooterBanner,
  SocialMedia,
  Description,
  Graph       } from './company-profile.model';
import {
  AppSettings
} from '../../../apiUrl';
import {  } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { BarGraphComponent } from '../../../services/shared/bar-graph/bar-graph.component';
import { values } from 'd3';
import {CookieService} from 'angular2-cookie/core';
import { NgxCarousel } from 'ngx-carousel';
@Component({
  selector: 'app-company-dispaly-profile',
  templateUrl: './company-dispaly-profile.component.html',
  styleUrls: ['./company-dispaly-profile.component.css'],
  providers: [ BarGraphComponent]
})
export class CompanyDispalyProfileComponent implements OnInit {
 
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
 
  noData: boolean;
  comapnyIdParam: any;
  apiEndPoint: string;

  companyData: any = [];
  graphData: any = [];
  id: number;
  urls: any;
  pic: any;
  fb = false;
  linkdn = false;
  twiit = false;
  utube = false;
  orgSection = true;
  socialSection = true;
  socialmedia = true;
  organizationlist: any = [];
  brandingImage: Organization;
  companyName: CompanyHeaderImage;
  compType: CompanyHeaderImage;
  industryType: CompanyHeaderImage;
  objective: AboutCompany;
  websiteAddress = 'www.xyz.com';
  logo: AboutCompany;
  orgDetails = [];
  missionStatement: AboutCompany;
  description: Description;
  companyObjective = 'companyObjective';
  readMore = 'ReadMore';
  formattedOrganization = [];
  organizationHeading: Organization;
  organizationName = 'ORGANIZATION 01';
  driveHeading = 'Drives in Progress';
  jobRoleHeading = 'JOB ROLE HISTORY';
  arrayWithFinal: any;
  loginData: any;
  offerDefault: boolean;
  campusDefault: boolean;
  // Social Media Links
  facebook = 'www.facebook.com';
  linkedin = 'www.linkdin.com';
  twitter = 'www.twitter.com';
  youtube = 'www.youtube.com';
  jobRoleDetails: any = [];
  driveData: any = [];
  slicedArray: any = [];
  // Footer
  totalCampusRectuitment: any;
  totalnumberofinterns: any;
  campusHire: any;
  highestCampusHire: any;
  avgOffer: Graph[] = [];
  companyJobDetail: Graph[] = [];
  jobs = [
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


CampusAndDetails = [
  {
    'name': 'Narayana college of engineering techincal science',
    'value': 65
  },
  {
    'name': 'RRV College',
    'value': 62
  },
  {
    'name': 'RRVS College',
    'value': 38
  },
  {
    'name': 'Aleti College',
    'value': 42
  },
  {
    'name': 'others',
    'value': 74
  }

];


  constructor(
    private CompanyProfile: AboutCompanyService,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private _router: Router,
    private route: ActivatedRoute,
  ) { 
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  final = { 'campusName': 'others', 'TotalJobsForThatCampus': 0 };

  getId() {
    this.id = this.urls;
    return this.id;
  }


  
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

    
    this.loginData = this.cookieService.getObject('loginResponce');
    this.urls = this._router.url;
    this.urls = this.urls.split('/')[2];

    this.route.params.subscribe(params => {
      this.comapnyIdParam = +params['id'];
   });

    this.apiEndPoint = AppSettings.API_ENDPOINT;
    console.log('url::' + this.urls);
    this.getDriveData(this.urls);
    this.getCompanyData(this.urls);
    this.getEventData(this.urls);
    this.getGraphData(this.urls);


    
  }
  /**
   *This function will fetch the company data from about
   *
   * @param {number} id
   * @memberof CompanyDispalyProfileComponent
   */
  getCompanyData(id: number): void {
    this.CompanyProfile.getCompanyProfile(id)
      .subscribe(
      (data: any[]) => {
      //  alert('haiiiii');
        this.companyData = data;
        this.getHeader(this.companyData);
        this.getAboutCompany(this.companyData);
        this.getDescription(this.companyData);
        this.orgDetails = this.getOrganizationDetails(this.companyData.orgDetails);
     //   console.log('ssssssaa' + JSON.stringify(this.companyData));

        this.getUrl(this.companyData);
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

  getEventData(id: number): void {
    this.CompanyProfile.getCompanyEvents(id)
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );
  }

  getDriveData(id: number): void {
    this.CompanyProfile.getDriveDetails(id)
      .subscribe(
      (data: any[]) => {
        this.driveData = data;
        if(this.driveData.length !== 0) {
          this.noData = true;
        }
        console.log('diveeeeeeeeeeeeeee' + JSON.stringify(this.driveData));
      },
      (error) => console.log(error)
      );
  }

  getGraphData(id: number): void {
    let avgOfferData: any = [];
    let headerData: any = [];
    this.CompanyProfile.getJobDetails(id)
      .subscribe(
      (response: any[]) => {
        this.graphData = response;
        avgOfferData = this.getAvgOffer(this.graphData);
     this.offerDefault =  this.CompanyProfile.getOfferscount(avgOfferData, this.offerDefault);
       this.jobRoleDetails = this.getCampusJobDetails(this.graphData);
       this.campusDefault =  this.CompanyProfile.getJobsCount(this.jobRoleDetails, this.campusDefault);
       avgOfferData = this.CompanyProfile.formatAvgOffer(avgOfferData);
      this.jobRoleDetails = this.CompanyProfile.otherSlice(this.jobRoleDetails, this.slicedArray, this.final);
       this.setAvgOffer(avgOfferData);
        this.setCompanyJobDetails(this.jobRoleDetails);
        headerData = this.CompanyProfile.formatHeader(this.graphData);
        this.totalCampusRectuitment = headerData.lastYearTotalOffers;
        this.totalCampusRectuitment = this.CompanyProfile.campusDecide(this.totalCampusRectuitment);
        this.campusHire = headerData.lastYearMaxSal;
        this.campusHire = this.CompanyProfile.campusDecide(this.campusHire);
        this.totalnumberofinterns = headerData.totalInterns;
        this.totalnumberofinterns = this.CompanyProfile.campusDecide(this.campusHire);
        this.highestCampusHire = headerData.lastYearCampus;
        this.highestCampusHire = this.CompanyProfile.campusDecide(this.highestCampusHire);
      },
      (error) => console.log(error)
      );
  }


  sendContact() {
    // alert("hiiii");
   const sendClickDetails = {
    'userId': this.loginData.userId,
    'role': this.loginData.role,
    'campusId': this.loginData.campusId,
    'educationPersonId': this.loginData.educationPersonId,
    'notificationName': 18,
    'companyList': [
    {
    'companyId': this.comapnyIdParam
    }
    ]
    };
    console.log('clickeeeeeeeeeee' + JSON.stringify(sendClickDetails));

    this.CompanyProfile.companyContact(sendClickDetails).subscribe(data => {
      //  console.log('Updated data' + JSON.stringify(data));
    //  alert('Programme Successfully Updated!');
    this.toastr.success('Notification Sent Successfully!');
    },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Error While Sending Notification!');
        // alert('Error While Updating');
        console.log('error', error);
      });

  }
//   pieOtherSlice(offerArray) {
//     console.log( 'this is offerArray(same as jobRoleDetails)' + JSON.stringify(offerArray));
//    this.slicedArray  = offerArray.slice(0, 5);
//    console.log( 'this is sliced(should contain only 6 elements)' + JSON.stringify(this.slicedArray));
//     for (let i = 6; i < offerArray.length; i++ ) {
//       console.log( offerArray[i].TotalJobsForThatCampus + 'checkc the offer array');
// this.final.TotalJobsForThatCampus += offerArray[i].TotalJobsForThatCampus;
// console.log('this is final.value' + JSON.stringify(this.final));

//     }
//     this.arrayWithFinal =  this.slicedArray.push(this.final);
//     console.log( 'this is final sliced array' + this.arrayWithFinal);
//    return  this.slicedArray.push(this.final);
//   }



  getHeader(companyData: {}) {
    this.companyName = this.companyData.Name;
    this.brandingImage = this.companyData.brandingImage;
    this.industryType = this.companyData.industryType;
    this.compType = this.companyData.compType;
  }

  getAboutCompany(companyData: {}) {
    this.objective = this.companyData.objective;
    this.websiteAddress = this.companyData.websiteAddress;
    this.logo = this.companyData.logo;
  }

  getDescription(companyData: {}) {
    this.description = this.companyData.description;
    this.missionStatement = this.companyData.missionStatement;
  }

  getOrganizationDetails(orgDetails: any = []): Organization[] {
    return orgDetails.map(function (organizations: Organization) {
      return { name: organizations.name, brandingImage: organizations.brandingImage };
    });
  }


  getUrl(companyData) {
    console.log('urrrlllllllll' + JSON.stringify(companyData));
    this.facebook = companyData.facebook;
    this.linkedin = companyData.linkedin;
    this.twitter = companyData.twitter;
    this.youtube = companyData.youtube;

    const prefix = 'https://';
    if (this.facebook && this.facebook.substr(0, prefix.length) !== prefix) {
      this.facebook = prefix + this.facebook;
    }

    const prefix1 = 'https://';
    if (this.linkedin && this.linkedin.substr(0, prefix1.length) !== prefix1) {
      this.linkedin = prefix1 + this.linkedin;
    }

    const prefix2 = 'https://';
    if (this.twitter && this.twitter.substr(0, prefix2.length) !== prefix2) {
      this.twitter = prefix2 + this.twitter;
    }

    const prefix3 = 'https://';
    if (this.youtube && this.youtube.substr(0, prefix3.length) !== prefix3) {
      this.youtube = prefix3 + this.youtube;
    }

    
    if (this.facebook === '' && this.linkedin === '' && this.twitter === '' && this.youtube === '') {
      this.socialSection = false;
      this.socialmedia = false;
    } else {
      if (this.facebook) {
        this.fb = true;
      }
      if (this.linkedin) {
        this.linkdn = true;
      }
      if (this.twitter) {
        this.twiit = true;
      }
      if (this.youtube) {
        this.utube = true;
      }
    }
  }

  getAvgOffer(jobDetails: any = []) {
    return jobDetails.avgOfferGraph;
  }

  getCampusJobDetails(jobDetails: any = []) {
    return  jobDetails.CampusAndJobDetails;
  }

  setAvgOffer(AvgOffer: any = []) {
    this.avgOffer = AvgOffer;
  }

  setCompanyJobDetails(jobDetails: any = []) {
    this.companyJobDetail = jobDetails;
  }
}

