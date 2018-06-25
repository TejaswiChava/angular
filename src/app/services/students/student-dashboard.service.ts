import { Injectable } from '@angular/core';
import { Request, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {AppSettings} from './../../apiUrl';

@Injectable()
export class StudentDashboardService {

    data: any[];
    private endpointUrl: string = AppSettings.API_ENDPOINT;

    constructor(private httpClient: HttpClient) {}

}
