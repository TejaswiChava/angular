import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-address',
  templateUrl: './address-form.component.html'
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  labelData: any;
  cityList: any = [];
  stateList: any = [];
  countryList: any = [];

    ngOnInit() {
    }
  constructor( private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.addressForm = this.fb.group({
      addressLine1: '' ,
      addressLine2: '',
      addressLine3: '',
      postalId: '',
      cityId: '',
      stateCode: '',
      countryCode: '',
      primaryInd: '',
      createDatetime: '',
      updateDatetime: '',
      createUserId: '',
      updateUserId: ''
    });
  }

  getPostalDet(value: any) {}

  getStateDet(value: any) {}

  getCountryDet(value: any) {}
}


