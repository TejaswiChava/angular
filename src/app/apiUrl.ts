import { environment } from '../environments/environment';
export class AppSettings {
    /********** Development  Url  ***********/
      // public static API_ENDPOINT= 'http://192.168.225.60:3000/api/';

    /***********Testing Url's***************/

 //  public static API_ENDPOINT= 'http://139.162.253.126:3000/api/';

 public static API_ENDPOINT= environment.apiendpoint;


    /********** Development  Url  --CACHE URL***********/
    // public static API_CACHE= 'http://192.168.225.60:3000/';

    /***********Testing Url's -CACHE URL***************/
 public static API_CACHE= environment.apicache;

    // url for abhi test purpose
 //  public static API_ENDPOINT = 'http://139.162.253.126:7878/api/';
 }
