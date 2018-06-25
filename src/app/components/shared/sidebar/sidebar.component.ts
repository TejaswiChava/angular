import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import {
    CookieService
  } from 'angular2-cookie/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    mainPath: string;
    path: string;

    router: any;
    campusStatus: any;
    sideValues: any;
    quickLink: any;
    selectedMenuActive: string;
    loginData: any = {};

    constructor(private _router: Router,
        private cookieService: CookieService,
        private activatedRoute: ActivatedRoute
    ) {
        console.log('routes');
        this.mainPath = this.activatedRoute.snapshot.url[0].path;
        console.log(this.activatedRoute.snapshot.url[0].path);
        this.path = this._router.url;
        // console.log('scosssss' + this.path);
        if (this.mainPath === 'campus') {
            if (this.path) {
                this.path = this.path.substring(8);
                if (this.path === 'campusMaster/department' || this.path === 'campusMaster/programme') {
                    console.log('1' + this.path);
                    this.selectedMenuActive = 'campusMaster/institutes';
                } else if (this.path === 'placement/campusEvent') {
                    console.log('2' +  this.path);
                    this.selectedMenuActive = 'placement/campusDrive';
                } else if (this.path === 'myProfile') {
                    console.log('2' +  this.path);
                    this.selectedMenuActive = '';
                } else {
                    console.log('3' + this.path);
                    this.selectedMenuActive = this.path;
                }
            }
        } else if (this.mainPath === 'company') {
            if (this.path) {
                this.path = this.path.substring(9);
                if (this.path === 'companyMaster/organization') {
                    console.log('4' + this.path);
                    this.selectedMenuActive = 'companyMaster/companies';
                } else if (this.path === 'controlData/compensationPackage' || this.path === 'controlData/campusList') {
                    console.log('5' +  this.path);
                    this.selectedMenuActive = 'controlData/jobrole';
                } else if (this.path === 'recruitment/employerEvent') {
                    console.log('6' +  this.path);
                    this.selectedMenuActive = 'recruitment/employerDrive';
                } else if (this.path === 'myProfile') {
                    console.log('2' +  this.path);
                    this.selectedMenuActive = '';
                } else {
                    console.log('7' + this.path);
                    this.selectedMenuActive = this.path;
                }
            }
        } else if (this.mainPath === 'scora') {
            if (this.path) {
                this.path = this.path.substring(7);
                console.log('wwe' + this.path);
                if (this.path === 'enroll') {
                    this.selectedMenuActive = 'enroll';
                } else {
                    this.selectedMenuActive = this.path;
                }
            }
        }

        this.campusStatus = window.location.href.indexOf('campus/') > -1 ? '/campus' :
            window.location.href.indexOf('company/') > -1 ? '/company' :
                window.location.href.indexOf('scora') > -1 ? '/scora' : this.router = _router;




        switch (this.campusStatus) {
            case '/campus':
            case '/campus/campusMaster':

                this.sideValues =
                    [

                        {

                            'urlLink': 'campusMaster/institutes',
                            'urlName': 'Institute Profile',
                            'img_icon': 'assets/images/sidePanel/institute/inst_profile_disable.png',
                            'active_img_icon': 'assets/images/sidePanel/institute/inst_profile.png'
                        },
                        {
                            'urlLink': 'dataUpload',
                            'urlName': 'Bulk Upload',
                            'img_icon': 'assets/images/sidePanel/institute/inst_bulk_upload_disable.png',
                            'active_img_icon': 'assets/images/sidePanel/institute/inst_bulk_upload.png'
                        },
                        {
                         'urlLink': 'placement/campusDrive',
                         'urlName': 'Placement Process',
                         'img_icon': 'assets/images/sidePanel/institute/inst_placement_process_disable.png',
                         'active_img_icon': 'assets/images/sidePanel/institute/inst_placement_process.png'
                         },
                         {
                            'urlLink': 'StudentManagement',
                            'urlName': 'Student Management',
                            'img_icon': 'assets/images/sidePanel/institute/inst_student management_disable.png',
                           'active_img_icon': 'assets/images/sidePanel/institute/inst_student Management.png'
                            }


                    ];

                this.quickLink =
                    [


                        {

                            'urlLink': 'createDrive',
                            'urlName': 'Create Drive'
                        },
                        {
                             'urlLink': 'createEvent',
                             'urlName': 'Create Event'
                        },
                        {
                            'urlLink': 'companysearch',
                            'urlName': 'Employer Search'
                        }

                    ];


                break;
            case '/company':

                this.sideValues =
                    [

                        {

                            'urlLink': 'companyMaster/companies',
                            'urlName': 'Employer Profile',
                            'img_icon': 'assets/images/sidePanel/company/company_profile_disable.png',
                        },
                        {

                            'urlLink': 'controlData/jobrole',
                            'urlName': 'Recruitment Metadata',
                            'img_icon': 'assets/images/sidePanel/company/company_recruitment_metadata_disable.png',
                        },
                        {

                            'urlLink': 'dataUpload',
                            'urlName': 'Bulk Upload',
                            'img_icon': 'assets/images/sidePanel/company/company_bulk_upload_disable.png',
                        },
                        {

                            'urlLink': 'recruitment/employerDrive',
                            'urlName': 'Recruitment Process',
                            'img_icon': 'assets/images/sidePanel/company/company_recruitment_process_disable.png',
                        },

                    ];


                this.quickLink =
                    [


                        {

                            'urlLink': 'createDrive',
                            'urlName': 'Create Drive'
                        },
                        {
                            'urlLink': 'createEvent',
                            'urlName': 'Create Event'
                        },

                        {
                            'urlLink': 'campusList',
                            'urlName': 'Institute Search'
                        },



                    ];
                break;
            case '/scora':
                this.sideValues = [
                    {

                        'urlLink': 'enroll',
                        'urlName': 'Enroll',
                        'img_icon': 'assets/images/sidePanel/company/company_recruitment_process_disable.png',
                    }
                ];
                break;

            default:
                console.log('default');
                this.sideValues =
                    [

                        {

                            'urlLink': 'companyMaster',
                            'urlName': 'Master Data'
                        },
                        {

                            'urlLink': 'controlData',
                            'urlName': 'Control Data'
                        },
                        // {

                        //     'urlLink': '/employerDrive',
                        //     'urlName': 'Drive'
                        // },


                    ];
                break;
        }
        // this.selectedMenuActive = this.sideValues[0].urlLink;
        // alert('saaa' + this.selectedMenuActive);
    }

    ngOnInit() {
        this.loginData = this.cookieService.getObject('loginResponce');
    }

    sideMenuActiveFun(urlLink, list, index): void {
        this.selectedMenuActive = urlLink;

    // this.sideValues;
    // this.sideValues[index].img_icon = list.active_img_icon;

    }
}
