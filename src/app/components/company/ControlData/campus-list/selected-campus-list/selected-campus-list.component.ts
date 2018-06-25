import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LookUpGetAndSetLocalSrorage } from '../../../../../lookup.service';
import { LookupvalueService } from './../../../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-selected-campus-list',
  templateUrl: './selected-campus-list.component.html',
  styleUrls: ['./selected-campus-list.component.css']
})
export class SelectedCampusListComponent implements OnInit, OnChanges {
  tierValue: any;
@Input() selectedCampusResponse;
@Input() campusListCount;
  constructor(
    public lookUp: LookUpGetAndSetLocalSrorage,
    private lookupValue: LookupvalueService
  ) { }
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'employerCampusListDtlCampus.name';
  public sortOrder = 'asc';
  data: any;
  labelData: any;
  universities: any;
  stateList: any;
  univList: any;
  cityList: any;
  tierValueData: any;
  cacheDataForLookup: any;
  ngOnInit() {
    this.tierValue = this.lookUp.getLookUpData('INSTITUTE_TIER', null);
    // this.tierValueData = this.lookUp.getLookUpData('INSTITUTE_TIER', null);
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // this.stateList = this.lookupValue.getState();
    // this.univList = this.lookupValue.getUniversity();
    // this.cityList = this.lookupValue.getCity();
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    if (this.cacheDataForLookup) {
      this.stateList = this.cacheDataForLookup.State;
      this.cityList = this.cacheDataForLookup.City;
      this.univList = this.cacheDataForLookup.University;
    }
    // this.tierValueData = this.lookupValue.getLookup('INSTITUTE_TIER');
    console.log('ddd' + JSON.stringify(this.tierValueData));
    // this.universities = this.lookupValue.getLookup('COMPANY_TYPE_CODE');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedCampusResponse) {
      // console.log('asdfds' + JSON.stringify(this.selectedCampusResponse));
      this.data = this.selectedCampusResponse;
    }
  }
}
