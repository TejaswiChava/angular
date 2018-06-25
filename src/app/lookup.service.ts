import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LabelsCookiesService } from './services/shared/common-cookies/labels-cookies.service';
@Injectable()
export class LookUpGetAndSetLocalSrorage {
    lookUpData: any;
    updateLookUp: any;
    updateLocalStorage: any;
    lookupCodeCopy: any;
    lookupValueIdCopy: any;
    count: number;
    lookupCodeData: any;
    lookupValueData: any;
    constructor(private _http: Http,
        private lookUp: LabelsCookiesService) { }
    private observable: Observable<any>;

    getLookUpData(lookupCode, lookupValueId) {
        this.count = 0;
        this.lookupCodeCopy = lookupCode;
        this.lookupValueIdCopy = lookupValueId;
        if (lookupCode && lookupValueId) {
            this.lookUpData = JSON.parse(localStorage.getItem('lookUpData'));
            this.lookupCodeData = this.lookUpData[lookupCode];
            if (this.lookupCodeData !== undefined) {
                this.lookupValueData = this.lookupCodeData[lookupValueId];
            }
            if (this.lookupValueData === undefined || this.lookupCodeData === undefined) {
                this.count++;
                this.updateCache();
            } else {
                return this.lookupValueData;
            }
        } else if (lookupCode) {
            this.lookUpData = JSON.parse(localStorage.getItem('lookUpData'));
            this.lookupCodeData = this.lookUpData[lookupCode];
            if (this.lookupCodeData === undefined) {
                this.count++;
                this.updateCache();
            } else {
                return this.lookupCodeData;
            }
        } else {
            return null;
        }
    }
    updateCache() {
        if (this.count > 1) {
            return null;
        } else {
            this.lookUp.updateLocalStorage().subscribe();
            this.lookUp.getLookUp().subscribe(lookUpdata => {
                this.lookUp = lookUpdata;
                localStorage.setItem('lookUpData', JSON.stringify(this.lookUp));
                this.getLookUpData(this.lookupCodeCopy, this.lookupValueIdCopy);
                return 0;
            });
        }
    }

}
