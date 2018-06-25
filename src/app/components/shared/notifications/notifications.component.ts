import { router } from '../../../app.company-routes';
import { Component, OnInit, ViewContainerRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CampusNotificationsService } from '../../../services/shared/notifications/campus-notifications/campus-notifications.service';
import { CookieService } from 'angular2-cookie/core';
import { OrderByDatePipe } from '../Pipes/order-by-date/order-by-date.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit, OnChanges {
    sorted: void;
    @Input() eventAccepted;
    @Output() eventAcceptedChange = new EventEmitter();
    loginData: any = {};
    filterQuery: any;
    allNotifications: any;
    newNotifications: any = [];
    readNotifications: any = [];
    allNotificationCount: any;
    rejectResponse: any;
    acceptResponse: any;
    event = false;
    data: any;
    constructor(private cookieService: CookieService,
        private CampusNotificationsService: CampusNotificationsService,
        private router: Router) { }
    ngOnChanges(changes: SimpleChanges) {

    }
    ngOnInit() {
        this.loginData = this.cookieService.getObject('loginResponce');
        this.loadNotifications();
    }

    // To get the notifications
    loadNotifications(): void {
        if (this.loginData) {
            if (this.loginData.campusId) {
                this.loadCampusPersonnotifications();
            } else if (this.loginData.companyId) {
            this.loadCompanyPersonnotifications();
            }
        }
    }

    loadCampusPersonnotifications(): void {
        const campusNotiInput = {
            'userId': this.loginData.userId,
            'role': this.loginData.role,
            'campusId': this.loginData.campusId,
            'notificationDismissedInd': 'N'
        };
        this.CampusNotificationsService.getNotificatons(campusNotiInput).subscribe(
            (data: any) => {
                this.data = data.data;
                this.allNotifications = (this.data).reverse();
                // this.data.sort(function(a, b) {
                //     if (a.notificationDetails.createDatetime > b.notificationDetails.createDatetime) {
                //         return -1;
                //       }
                //       if (a.notificationDetails.createDatetime < b.notificationDetails.createDatetime) {
                //         return 1;
                //       }
                //       return 0;
                // });
                console.log('dddddddddddddd', this.allNotifications[0]);
            },
            error => {
                console.log('error getting notifications...');
            }
        );
    }

    loadCompanyPersonnotifications(): void {
        const companyNotiInput = {
            'userId': this.loginData.userId,
            'role': this.loginData.role,
            'companyId': this.loginData.companyId,
            'notificationDismissedInd': 'N'
        };
        this.CampusNotificationsService.getNotificatons(companyNotiInput).subscribe(
            (data: any) => {
                this.data = data.data;
                console.log('nodifications', this.data);
                this.allNotifications = (this.data).reverse();
                // this.data.sort(function(a, b) {
                //     if (a.notificationDetails.createDatetime > b.notificationDetails.createDatetime) {
                //         return -1;
                //       }
                //       if (a.notificationDetails.createDatetime < b.notificationDetails.createDatetime) {
                //         return 1;
                //       }
                //       return 0;
                // });
                console.log('dddddddddddddd', this.allNotifications[0]);
            },
            error => {
                console.log('error getting notifications...');
            }
        );
    }

    rejectEvent(notification) {
        const data = notification;
        const eventReject = {
            'employerEventId': data.notificationEvent.transactionId,
            'userId': this.loginData.userId,
            'role': this.loginData.role,
            'educationPersonId': this.loginData.educationPersonId,
            'campusId': this.loginData.campusId,
            'Action': 'Rejected'
        };
        //   alert(JSON.stringify(eventReject));
        this.CampusNotificationsService.eventAction(eventReject).subscribe(data => {
        this.rejectResponse = data;
            console.log('123456' + JSON.stringify(this.rejectResponse));
        });
        this.loadNotifications();
    }

    acceptEvent(notification) {
        const data1 = notification;
        this.eventAccepted = data1.notificationEvent.transactionId;
        this.eventAcceptedChange.emit(this.eventAccepted);
        this.router.navigateByUrl('campus/acceptCreateEvent/' + this.eventAccepted);

    }
    dissmissMessage(notification) {
            const updateNotifications = notification.notificationDetails;
            updateNotifications.notificationDismissedInd = 'Y';
            updateNotifications.readDatetime = new Date();
            updateNotifications.campusId = this.loginData.campusId;
            updateNotifications.companyId = this.loginData.companyId;
            console.log('updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', updateNotifications);
            this.CampusNotificationsService.updateNewNotificatons(updateNotifications).subscribe(
                data => {
                    this.loadNotifications();
                    console.log('this is updated notification', data);
                },
                error => {
                    console.log('error getting notifications...');
                }
            );
    }
}
