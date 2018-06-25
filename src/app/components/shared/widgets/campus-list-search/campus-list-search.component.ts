import { Component, OnInit , Input, Output, EventEmitter, OnChanges, Directive, SimpleChanges, ViewContainerRef  } from '@angular/core';
import { NgModule } from '@angular/core';
import { CampusListSearchService } from '../../../../services/shared/widgets/campus-list-search.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccordionModule } from 'ng2-accordion';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campus-list-search',
  templateUrl: './campus-list-search.component.html',
  styleUrls: ['./campus-list-search.component.css']
})
export class CampusListSearchComponent implements OnInit, OnChanges {
  stateList2: any;
  selectedCampus: any;
  skillTypeLookupTypes: any;
  intrestTypeLookupType: any;
  programMajLookupType: any;
  programCatLookupType: any;
  programClassLookupType: any;
  stateCacheList: any;
  countryCacheList: any;
  cacheDataForLookup: any;
  universityLookup: any;
  programLookupType: any;
  instituteTierLookupArray: any[];
  instituteLookUpTier: any;
  @Input() selectedCampusResponse;
  @Input() getSelectCampus;
  @Output() getSelectCampusChange = new EventEmitter();
  univList: any;
  campusListSearch: FormGroup;
  campusListFilter: FormGroup;
  searchData: any;
  stateList: any;
  stateSelect: any;
  cityList: any;
  programLoopup: any;
  programClassLoopup: any;
  programMajLoopup: any;
  programCatLoopup: any;
  skillTypeLookup: any;
  intrestTypeLookup: any;
  labelData: any;
  data: any;
  cList: any = [];
  skill: any = [];
  skillList: any = [];
  intrest: any = [];
  intrestList: any = [];
  filterResp: any;
  searchFilter = false;
  selectedCampusData: any = [];
  filterFlag = false;
  filterCount = 0;
  totalCount = 0;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  region = [
    { value: 'E', viewValue: 'East Region' },
    { value: 'W', viewValue: 'West Region' },
    { value: 'N', viewValue: 'North Region' },
    { value: 'S', viewValue: 'South Region' }
  ];

  allCampuses: any= [];
  showCampusCheckBox = true;
  selectedAll: any;

  constructor(
    private campusSearch: CampusListSearchService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private lookupvalueService: LookupvalueService,
    private fb: FormBuilder) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.createForm();
    this.filter();
  }

  ngOnInit() {

    if (window.location.href.indexOf('company/campusList') > -1 ) {
      this.showCampusCheckBox = false;
    }
    this.labelData = JSON.parse(localStorage.getItem('labelData'));

    this.lookupvalueService.setAllData();
    this.countryCacheList = this.lookupvalueService.getCountry();
    this.stateList = this.lookupvalueService.getState();
    this.stateList2 = this.lookupvalueService.getState();
    this.univList = this.lookupvalueService.getUniversity();
    this.cityList = this.lookupvalueService.getCity();

    this.programLookupType = this.lookupvalueService.getLookup('PROGRAM_TYPE_CODE');
    this.programLoopup = this.lookupvalueService.getLookupSorted('PROGRAM_TYPE_CODE');

    this.programClassLookupType = this.lookupvalueService.getLookup('PROGRAM_CLASSIFICATION_CODE');
    this.programClassLoopup = this.lookupvalueService.getLookupSorted('PROGRAM_CLASSIFICATION_CODE');

    this.programCatLookupType = this.lookupvalueService.getLookup('PROGRAM_CATEGORY_CODE');
    this.programCatLoopup = this.lookupvalueService.getLookupSorted('PROGRAM_CATEGORY_CODE');

    this.programMajLookupType = this.lookupvalueService.getLookup('PROGRAM_MAJOR');
    this.programMajLoopup = this.lookupvalueService.getLookupSorted('PROGRAM_MAJOR');

    this.skillTypeLookupTypes = this.lookupvalueService.getLookup('SKILL_TYPE_CODE');
    this.skillTypeLookup = this.lookupvalueService.getLookupSorted('SKILL_TYPE_CODE');

    this.intrestTypeLookupType = this.lookupvalueService.getLookup('INTEREST_TYPE_CODE');
    this.intrestTypeLookup = this.lookupvalueService.getLookupSorted('INTEREST_TYPE_CODE');

    this.instituteLookUpTier = this.lookupvalueService.getLookup('INSTITUTE_TIER');
    this.instituteTierLookupArray = this.lookupvalueService.loadArrayLookups(this.instituteLookUpTier);


  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedCampusResponse) {
    }
  }
  createForm() {
    this.campusListSearch = this.fb.group({
      searchName: '',
      universityId: '',
      tierValueId: '',
      state: '',
      cityId: '',
      regionFlag: '',
      programTypeValueId: '',
      programMajorValueId: ''
    });
  }

  filter() {
    this.campusListFilter = this.fb.group({
      programTypeValueId: '',
      programClassValueId: '',
      programCatValueId: '',
      programMajorValueId: '',
      skillTypeValueId: '',
      interestTypeValueId: '',
      minSalary: '',
      maxSalary: ''
    });
  }

  selectAll(event) {
    this.selectedCampusData = [];
    if (event.target.checked) {
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].selected = this.selectedAll;
      this.selectedCampusData.push(this.data[i]);
      }
    } else {
      this.selectedCampusData = [];
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].selected = this.selectedAll;
      }
    }
    this.getSelectCampus = this.selectedCampusData;
    this.getSelectCampusChange.emit(this.selectedCampusData);
  }

  selectCampus(event, cId) {
    if (event.target.checked) {
      this.selectedCampusData.push(cId);
      // this.selectedCampus = this.selectedCampusData;
    } else {
      // this.selectedCampus = this.selectedCampusData;
      this.selectedCampusData = this.selectedCampusData.filter(val => {
        return val.campusId !== cId.campusId;
      });
      // console.log('Data after popping ---> ' + JSON.stringify(this.selectedCampus));
    }
    this.selectedAll = this.data.every(function(campus: any) {
      return campus.selected === true;
    });
      this.selectedCampus = this.selectedCampusData;
      // this.getSelectCampus = this.selectedCampus;
      // console.log('Selected Campus  ----> ' + JSON.stringify(this.selectedCampus));
      this.selectedCampus = this.selectedCampusData;
      this.getSelectCampusChange.emit(this.selectedCampus);
  }

  loadSelectedRegionStates(region) {
    this.campusListSearch.get('state').setValue('');
    this.campusListSearch.get('cityId').setValue('');

    if (region === '') {
      this.stateList = this.lookupvalueService.getState();
      this.cityList = this.lookupvalueService.getCity();
      this.campusListSearch.patchValue({
        state: '',
        cityId: ''
      });
    }
    if (region) {
      this.stateList = this.lookupvalueService.getState();
      this.stateList = this.loadStates(this.stateList, region);
      this.loadStatesCities(this.stateList);
      this.campusListSearch.patchValue({
        state: '',
        cityId: ''
      });
    }
  }

  loadStates(allstates, region) {
    // tslint:disable-next-line:prefer-const
    let states = [];
    if (allstates) {
      for (let i = 0; i < allstates.length; i++) {
        if (allstates[i].regionFlag === region) {
          states.push(allstates[i]);
        }
      }
    }
    return states;
  }

  loadSelectedStateCities(state) {
    this.campusListSearch.get('cityId').setValue('');
    if (state === '') {
      this.cityList = this.lookupvalueService.getCity();
      this.campusListSearch.patchValue({
        cityId: '',
      });
    }
    if (state) {
      this.cityList = this.lookupvalueService.getCity();
      this.cityList = this.loadCities(this.cityList, state);
      this.campusListSearch.patchValue({
        cityId: '',
      });
    }
  }

  loadStatesCities(states) {
    let citiesArray = [];
    const cityListTemp = this.lookupvalueService.getCity();
    citiesArray = states.map(function (state) {
      return cityListTemp.filter(function (city){
        return city.stateCode === state.stateCode;
      });
    });
    // The following line will convert an array of array into a flat array.
    this.cityList = [].concat.apply([], citiesArray);
    this.cityList.sort(this.lookupvalueService.compareCity);
  }

  loadCities(allcities, state) {
    // tslint:disable-next-line:prefer-const
    let cities = [];
    if (allcities) {
      for (let i = 0; i < allcities.length; i++) {
        if (allcities[i].stateCode === state) {
          cities.push(allcities[i]);
          // console.log('dd');
        }
      }
    }
    return cities;
  }

  search(x, y, minSalary, maxSalary) {
    this.searchFilter = false;
    this.selectedAll = false;
    if ((x === undefined) && (y === undefined)) {
      this.campusListFilter.reset({
        programTypeValueId: '',
        programClassValueId: '',
        programCatValueId: '',
        programMajorValueId: '',
        skillTypeValueId: '',
        interestTypeValueId: ''
      });
      this.filterFlag = false;
      this.filterCount = 0;
    }
    // if (this.campusListSearch.get('searchName').value === '' && this.campusListSearch.get('universityId').value === '' &&
    // this.campusListSearch.get('tierValueId').value  === '' && this.campusListSearch.get('regionFlag').value === '' &&
    // this.campusListSearch.get('state').value === '' && this.campusListSearch.get('cityId').value === '' &&
    // this.campusListSearch.get('programTypeValueId').value === '' && this.campusListSearch.get('programMajorValueId').value === '') {
    //   this.toastr.warning('Please Select Atleast One Search Criteria!', 'Alert!');
    // }

    // NULL value has to be passed for placeholder to appear.Then validate the empty value with null and empty value.

const university = this.campusListSearch.get('universityId').value;
const tier = this.campusListSearch.get('tierValueId').value;
const region = this.campusListSearch.get('regionFlag').value;
const state = this.campusListSearch.get('state').value;
const city = this.campusListSearch.get('cityId').value;
const program = this.campusListSearch.get('programTypeValueId').value;
const major = this.campusListSearch.get('programMajorValueId').value;
console.log('this is university' + university);
if ( (university === '' || university === null) &&
      (tier === '' || tier === null ) &&
      ( region === '' || region === null ) &&
      ( state === '' || state === null ) &&
      ( city === '' || city === null ) &&
      ( program === '' || program === null ) &&
      ( major === '' || major === null ) &&
      ( this.campusListSearch.get('searchName').value === '' )
    ) {
      this.toastr.warning('Please Select Atleast One Search Criteria!', 'Alert!');
}


    this.data = [];

    if (this.campusListSearch.get('searchName').value || this.campusListSearch.get('universityId').value ||
    this.campusListSearch.get('tierValueId').value || this.campusListSearch.get('regionFlag').value ||
    this.campusListSearch.get('state').value || this.campusListSearch.get('cityId').value ||
    this.campusListSearch.get('programTypeValueId').value || this.campusListSearch.get('programMajorValueId').value) {
      const searchData = this.campusListSearch.value;
      if (searchData.universityId === null || searchData.universityId === undefined) {
        searchData.universityId = '';
      }else if (searchData.tierValueId === null || searchData.tierValueId === undefined ) {
          searchData.tierValueId = '';
      }else if ( searchData.regionFlag === null || searchData.regionFlag === undefined) {
          searchData.regionFlag = '';
      } else if (  searchData.state === null || searchData.state === undefined ) {
        searchData.state = '';
      } else if ( searchData.cityId === null || searchData.cityId === undefined ) {
        searchData.cityId = '';
      } else if ( searchData.programTypeValueId === null || searchData.programTypeValueId === undefined ) {
        searchData.programTypeValueId = '';
      } else if ( searchData.programMajorValueId === null || searchData.programMajorValueId === undefined ) {
        searchData.programMajorValueId = '';
      }
      const sName = searchData.searchName;
      if (sName) {
        searchData.searchName = sName.toUpperCase();
      }
      searchData.skills = (x) ? x : [];
      searchData.interests = (y) ? y : [];
      searchData.minSalary = (minSalary !== undefined && minSalary !== null) ? minSalary : 0;
      searchData.maxSalary = (maxSalary !== undefined && maxSalary !== null) ? maxSalary : 0;
      const displayFlag = 'Y';
      this.campusSearch.search(searchData, displayFlag).subscribe(data => {
      this.searchData = data;
        if (this.searchData.length > 0) {
          if (this.selectedCampusResponse) {
            for (let i = 0; i < this.selectedCampusResponse.length; i++) {
                const cId = this.selectedCampusResponse[i].employerCampusListDtlCampus.campusId;
                const Index = this.searchData.findIndex(data => data.campusId === cId);
                if (Index !== -1) {
                  if (this.searchData.length === 1) {
                    this.toastr.warning('Campus already exists!', 'Alert');
                  }
                this.searchData.splice(Index, 1);
                }
              }
              this.data = this.searchData;
              if ((searchData.skills.length > 0) || (searchData.interests.length > 0)) {
                this.filterCount = this.data.length;
                this.filterFlag = true;
              } else {
                this.totalCount = this.data.length;
              }
          } else {
            this.data = this.searchData;
            if ((searchData.skills.length > 0) || (searchData.interests.length > 0)) {
              this.filterCount = this.data.length;
              this.filterFlag = true;
            } else {
              this.totalCount = this.data.length;
            }
          }
          for (let i = 0; i < this.searchData.length; i++) {
            const cId = this.searchData[i].campusId;
            this.cList.push({ campusId: cId });
          }
          this.searchFilter = true;
        } else if ((searchData.skills.length > 0) || (searchData.interests.length > 0)) {
          this.filterCount = this.data.length;
          this.filterFlag = true;
          this.searchFilter = true;
        } else {
          this.toastr.warning('No Data Found!');
          this.searchFilter = false;
        // }
      }
      },
      error => {
        this.toastr.warning('No Data Found!');
      });
    }
  }



  // The function is to override the default behavior provide by HTML-5 reset button
  // In order to set the values, calling to createForm again with empty values
  reset() {
    this.campusListSearch.reset({
      searchName: '',
      universityId: '',
      tierValueId: '',
      state: '',
      cityId: '',
      regionFlag: '',
      programTypeValueId: '',
      programMajorValueId: ''
    });
    this.searchFilter = false;
    this.data = [];
    this.filter();
    this.stateList = this.lookupvalueService.getState();
    this.cityList = this.lookupvalueService.getCity();
    this.filterFlag = false;
    this.filterCount = 0;
  }

  filterReset() {

    console.log(JSON.stringify(this.campusListFilter.get('skillTypeValueId').value));
    console.log(JSON.stringify(this.campusListFilter.get('interestTypeValueId').value));
    if (this.campusListFilter.get('skillTypeValueId').value == '' || this.campusListFilter.get('interestTypeValueId').value == '' ||
    this.campusListFilter.get('skillTypeValueId').value == null || this.campusListFilter.get('interestTypeValueId').value == null ) {
      console.log('zzz');
    } else {
      this.selectedAll = false;
      this.search(undefined, undefined, undefined, undefined);
    }

    this.campusListFilter.reset({
      programTypeValueId: '',
      programClassValueId: '',
      programCatValueId: '',
      programMajorValueId: '',
      skillTypeValueId: '',
      interestTypeValueId: ''
    });
    this.filterFlag = false;
    this.filterCount = 0;

  }
}
