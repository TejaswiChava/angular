import { LookupvalueService } from './../../../../services/shared/lookupvalue.service';
import { Event } from 'vscode-jsonrpc/lib/events';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewContainerRef
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CompanySearchService } from '../../../../services/shared/widgets/company-search/company-search.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { CompanySearchOutput } from './company-search.model';
import { Router } from '@angular/router';
// import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ToastrService } from 'ngx-toastr';
import { EmptyResponseService } from '../../../../services/shared/empty-response/empty-response.service';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit, OnChanges {
  stateMainList: any;
  companySizeLookupType: any;
  companyLookupType: any;
  private campusId: number;
  @Input() clickData;
  @Output() clickDataChange = new EventEmitter();
  @Input() clickStatus;
  @Output() clickStatusChange = new EventEmitter();
  companyListSearch: FormGroup;
  stateList: any;
  cityList: any;
  campusStatus: any;
  companySizeValueId: any;
  companyType: any;
  industryType: any[];
  loginData: any;
  searchFilter = false;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  data: any = [];
  hideActionColumn = true;
  private searchResultCounnt: number;
  region = [
    {
      value: 'E',
      viewValue: 'East Region'
    },
    {
      value: 'N',
      viewValue: 'North Region'
    },
    {
      value: 'S',
      viewValue: 'South Region'
    },
    {
      value: 'W',
      viewValue: 'West Region'
    }
  ];

  constructor(
    private companySearch: CompanySearchService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private lookupValue: LookupvalueService,
    private route: Router,
    private viewContainerRef: ViewContainerRef,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    public isEmpty: EmptyResponseService
  ) {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.setCampusId(this.loginData);
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.createForm();
  }

  ngOnInit() {
    this.companyLookupType = this.lookupValue.getLookup('COMPANY_TYPE_CODE');
    this.companySizeLookupType = this.lookupValue.getLookup(
      'COMPANY_SIZE_CODE'
    );

    this.lookupValue.setAllData();
    this.stateList = this.getStateList();
    this.cityList = this.getCityList();
    this.companySizeValueId = this.lookupValue.getLookupArray(
      'COMPANY_SIZE_CODE'
    );
    this.companyType = this.lookupValue.getLookupSorted('COMPANY_TYPE_CODE');
    this.industryType = this.lookupValue.getLookupSorted('INDUSTRY_TYPE_CODE');
    if (window.location.href.indexOf('campus/companysearch') > -1) {
      this.hideActionColumn = false;
    }
  }

  ngOnChanges() {}

  setCampusId(loginData: any) {
    this.campusId = loginData.campusId;
  }

  getCampusId() {
    return this.campusId;
  }

  getCityList() {
    return this.lookupValue.getCity();
  }

  getStateList() {
    return this.lookupValue.getState();
  }

  getSearchResultCount() {
    return this.searchResultCounnt;
  }

  setSearchResultCount(value: number) {
    this.searchResultCounnt = value;
  }

  resetSearchresult() {
    this.searchFilter = false;
    this.data = [];
  }

  createForm() {
    this.companyListSearch = this.fb.group({
      searchName: '',
      companyId: '',
      companySizeValueId: '',
      companyTypeValueId: '',
      industryTypeValueId: '',
      cityId: '',
      stateCode: '',
      internshipInd: 'B',
      regionFlag: '',
      companyStatusValueId: '',
    });
  }
  select(data) {
    this.clickData = data;
    this.clickDataChange.emit(this.clickData);
    this.clickStatus = true;
    this.clickStatusChange.emit(this.clickData);
  }
  searchCompany() {
        if (this.isEmpty.objectIsEmpty(this.companyListSearch.value)) {
      if (
        this.route.url === '/campus/createEvent' ||
        this.route.url === '/campus/placement/campusEvent'
      ) {
        this.companyListSearch.value.companyStatusValueId = 365;
      }
      this.companySearch
        .search(this.companyListSearch.value)
        .subscribe(data => {
          if (!this.isEmpty.checkResponse(data)) {
            this.toastr.warning('No Data Found!');
            this.data = [];
          } else {
            this.data = data;
            console.log('this is data' + this.data);
            this.setSearchResultCount(this.data.length);
            this.searchFilter = true;
          }
        },
      error => {
        this.toastr.warning('No Data Found!');
        this.resetSearchresult();
      });
    } else {
      this.toastr.warning('Please select atleast one search criteria !');
      this.resetSearchresult();
    }
  }

  onStateSelect(states) {
    this.cityList = this.getCityList();
    if (states === '') {
      return this.cityList;
    } else {
      this.cityList = this.cityList.filter(function(city) {
        return city.stateCode === states;
      });
      this.companyListSearch.patchValue({
        cityId: ''
      });
    }
  }

  onRegionSelect(region) {
    this.stateList = this.getStateList();
    if (region === '') {
      this.cityList = this.getCityList();
      this.companyListSearch.patchValue({
        stateCode: '',
        cityId: ''
      });
    } else {
      this.stateList = this.stateList.filter( function (state) {
        return state.regionFlag === region;
      });
      this.loadStatesCities(this.stateList);
      this.companyListSearch.patchValue({
        stateCode: '',
        cityId: ''
      });
    }
  }

  loadStatesCities(states) {
    let citiesArray = [];
    const cityListTemp = this.getCityList();
    citiesArray = states.map(function (state) {
      return cityListTemp.filter(function (city){
        return city.stateCode === state.stateCode;
      });
    });
    // The following line will convert an array of array into a flat array.
    this.cityList = [].concat.apply([], citiesArray);
    this.cityList.sort(this.lookupValue.compareCity);
  }

  // The function is to override the default behavior provide by HTML-5 reset button
  // In order to set the values, calling to createForm again with empty values
  reset() {
    this.companyListSearch.reset({
      searchName: '',
      companyId: '',
      companySizeValueId: '',
      companyTypeValueId: '',
      industryTypeValueId: '',
      cityId: '',
      companyStatusValueId: '',
      stateCode: '',
      internshipInd: 'B',
      regionFlag: '',
      companyStatus: ''
    });
    this.cityList = this.getCityList();
    this.stateList = this.getStateList();
    this.resetSearchresult();
  }
}
