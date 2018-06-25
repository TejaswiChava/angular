import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AppSettings } from '../../../apiUrl';
import { CampusService } from '../../../services/common/landing-pages/campus-landing/campus.service';
import { CampusNotificationsService } from '../../../services/shared/notifications/campus-notifications/campus-notifications.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    [x: string]: any;
    read: any = [];
    data: any = [];
    combined: any = [];
    personProfileDetails: any;
    personDetails: any;
    // router: any;
    bool: any = true;
    allNotifi: boolean;
    urlValues: any;
    campusStatus: any;
    loginData: any = {};
    campsloginData: any;
    apiEndPoint: any;
    showNoti = false;
    hideHeader = false;
    awaitingNotifications: any;

    notifications: any;
    newNotifications: any = [];
    readNotifications: any = [];
    allNotificationCount: any;
    awaitingNotificationsCount = 0;

    loadPersonProfiledetails: any;
    loadEmployerPersonProfile: any;
    loadEducationPersonProfile: any;
    constructor(private _router: Router, private cookieService: CookieService,
        private CampusNotificationsService: CampusNotificationsService,
        private campusService: CampusService) {

    }

    ngOnInit() {
        // redirecting the page when there is no login details starts /
        this.loadLoginRespdata();
        this.loadNotifications();
        this.loadHeaderChanges();
        setTimeout(() => {
            this.bool = false;
        }, 2000);
        this.apiEndPoint = AppSettings.API_ENDPOINT;

        // loadPersonProfiledetails
        this.loadPersonProfiledetails = function() {
            this.newNotifications = [];
            this.readNotifications = [];
            if (this.loginData) {
                if (this.loginData.campusId) {
                    this.loadEducationPersonProfile();
                } else if (this.loginData.companyId) {
                    this.loadEmployerPersonProfile();
                }
            }
        };

        this.loadEducationPersonProfile = function() {
            this.CampusNotificationsService.getPersonsInstDetails(
                this.loginData.educationPersonId, this.loginData.campusId).subscribe(data => {
                  this.personProfileDetails = data.data[0];
                  this.personProfileDetails.pictureUrl = this.personProfileDetails.pictureUrl;
                },
            error => {
                console.log(error);
            });
        };

        this.loadEmployerPersonProfile = function() {
            this.CampusNotificationsService.getPersonsDetails(
                this.loginData.employerPersonId, this.loginData.companyId).subscribe(data => {
                this.personProfileDetails = data.data[0];
            });
        };
        this.loadPersonProfiledetails();

    }
    loadLoginRespdata() {
        this.loginData = this.cookieService.getObject('loginResponce');
    }
    // to get the notifications
    loadNotifications() {
        this.timeOut = false;
        setTimeout(() => {
            this.timeOut = true;
        }, 2000);
        this.awaitingNotifications = 0;
        this.data = [];
        this.read = [];
        this.readNotifications = [];
        this.newNotifications = [];
        this.awaitingNotificationsCount = 0;
        if (this.loginData) {
            if (this.loginData.campusId) {
                this.loadCampusPersonnotifications();
            } else if (this.loginData.companyId) {
                this.loadCompanyPersonnotifications();
            }
        }

    }


    loadCampusPersonnotifications() {
        this.notifications = [];
        const campusNotiInput = {
            'userId': this.loginData.userId,
            'role': this.loginData.role,
            'campusId': this.loginData.campusId,
            'notificationDismissedInd': 'N'
        };
        this.CampusNotificationsService.getNotificatons(campusNotiInput).subscribe(
            (data: any) => {
                this.notifications = data.data;

                if (this.notifications) {
                    this.allNotificationCount = this.notifications.length;
                    for (let i = 0; i < this.notifications.length; i++) {
                        if (this.notifications[i].notificationDetails.notificationReadInd === 'N') {
                            this.awaitingNotificationsCount++;
                            this.data.push(this.notifications[i]);
                            if(i == this.notifications.length - 1) {
                                this.sortNotifications();
                            }
                        } else {
                            this.read.push(this.notifications[i]);
                            if(i == this.notifications.length - 1) {
                                this.sortNotifications();
                            }
                        }
                    }
                }
                // console.log("new notifications.."+ JSON.stringify(this.newNotifications));
                // console.log("read notifications.."+ JSON.stringify(this.readNotifications));

            },
            error => {
                console.log('error getting notifications...');
            }
        );
    }
    updateNodifications() {
        if(this.awaitingNotificationsCount == 0) {
            if (this.loginData) {
                if (this.loginData.campusId) {
                    this.loadCampusPersonnotifications();
                } else if (this.loginData.companyId) {
                    this.loadCompanyPersonnotifications();
                }
            }
        }
    }

    loadCompanyPersonnotifications() {
        this.notifications = [];
        const companyNotiInput = {
            'userId': this.loginData.userId,
            'role': this.loginData.role,
            'companyId': this.loginData.companyId,
            'notificationDismissedInd': 'N'
        };
        this.CampusNotificationsService.getNotificatons(companyNotiInput).subscribe(
            (data: any) => {
                this.notifications = data.data;
                this.awaitingNotifications = [];
                this.newNotifications = [];
                if (this.notifications) {
                    this.allNotificationCount = this.notifications.length;
                    this.data = [];
                    this.read = [];
                    this.combined = [];
                    for (let i = 0; i < this.notifications.length; i++) {
                        if (this.notifications[i].notificationDetails.notificationReadInd === 'N') {
                            this.awaitingNotificationsCount++;
                            this.data.push(this.notifications[i]);
                            if(i == this.notifications.length - 1) {
                                this.sortNotifications()
                            }
                        } else {
                            this.read.push(this.notifications[i]);
                            if(i == this.notifications.length - 1) {
                                this.sortNotifications();
                            }
                        }
                    }
                }
                // console.log("new notifications.."+ JSON.stringify(this.newNotifications));
                // console.log("read notifications.."+ JSON.stringify(this.readNotifications));
            },
            error => {
                console.log('error getting notifications...');
            }
        );
    }
    sortNotifications() {
        this.newNotifications = (this.data).reverse();
        this.readNotifications = (this.read).reverse();
        if(this.newNotifications === '' && this.readNotifications === '') {
            this.allNotifi = true;
        }
        // this.newNotifications = this.combined.sort(function(a, b) {
        //     if (a.notificationDetails.createDatetime > b.notificationDetails.createDatetime) {
        //         return -1;
        //       }
        //       if (a.notificationDetails.createDatetime < b.notificationDetails.createDatetime) {
        //         return 1;
        //       }
        //       return 0;
        // });
    }

    /**
     * To Load Header links based on User
     * @memberof HeaderComponent
     */
    loadHeaderChanges() {
        if (this.loginData) {
            if (this.loginData.campusId) {
                this.urlValues = [{
                        'urlLink': '/campus/dashboard',
                        'urlName': 'HOME'
                    }];
            } else if (this.loginData.companyId) {
                this.urlValues = [{
                        'urlLink': '/company/dashboard',
                        'urlName': 'HOME'
                    }];
            } else if (this.loginData.role === 'SYSADMIN') {
                this.urlValues = [{
                        'urlLink': '/scora',
                        'urlName': 'SCORA'
                    }];
            }
        } else {
            this.urlValues = [
                {
                    'urlLink': '/scoraLandingPage',
                    'urlName': 'HOME'
                },
                {
                    'urlLink': '/campusLandingPage',
                    'urlName': 'INSTITUTE'
                },
                {
                    'urlLink': '/comapanyLandingPage',
                    'urlName': 'EMPLOYER'
                },
                {
                    'urlLink': '/studentLandingPage',
                    'urlName': 'STUDENT'
                }];
        }

    }


    signOut() {
        const cPage = this.loginData.campusId;
        const comPage = this.loginData.companyId;
        const scoraAdmin = this.loginData.role;
        this.campusService.logout();
        this.campusStatus = '';
        this.loginData = {};
        this.loadHeaderChanges();
        // this.loadHeaderChanges();
        // window.location.reload();
        if (cPage) {
            window.location.replace('/campusLandingPage');
            // this.headerChanges('campusLandingPage');
            // this._router.navigateByUrl('/campusLandingPage');
        }
        if (comPage) {
            window.location.replace('/comapanyLandingPage');
            // this.headerChanges('comapanyLandingPage');
            // this._router.navigateByUrl('/comapanyLandingPage');

        }
        if (scoraAdmin === 'SYSADMIN') {
            window.location.replace('/scoraLandingPage');
            // window.location.reload();
            // this.headerChanges('scoraLandingPage');
            // this._router.navigate(['scoraLandingPage']);
        }
    }
    // notification part......


    showNotifications(newNoti) {
        if (newNoti) {

            for (let i = 0; i < newNoti.length; i++) {
                const upNewNoti = newNoti[i].notificationDetails;
                upNewNoti.notificationReadInd = 'Y';
                upNewNoti.readDatetime = new Date();
                upNewNoti.campusId = this.loginData.campusId;
                upNewNoti.companyId = this.loginData.companyId;
                this.CampusNotificationsService.updateNewNotificatons(upNewNoti).subscribe(
                    data => {
                        console.log('read notifications...' + data);
                    },
                    error => {
                        console.log('error getting notifications...');
                    }
                );
            }
            this.awaitingNotificationsCount = undefined;
            this.newNotifications = [];
            this.readNotifications = [];
        }
        if (this.loginData) {
            if (this.loginData.campusId) {
                this.loadCampusPersonnotifications();
                this._router.navigate(['campus/notifications']);
            } else if (this.loginData.companyId) {
                this.loadCompanyPersonnotifications();
                this._router.navigate(['company/notifications']);
            }
        }

    }
    trackList(index, notification) {
        // console.log('date'+notification.notificationDetails.createDatetime);
        return notification.notificationDetails.createDatetime;
    }


}
