import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LookupvalueService } from './../../../../services/shared/lookupvalue.service';
import { PostalService } from './../../../../services/shared/postal.service';
import { ProfileFormService } from './../../../../services/students/profile-form.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  StudentForm: FormGroup;
  Gender: any;
  Country: any;
  foods: any = [];


  constructor(private fb: FormBuilder,
    private lookup: LookupvalueService,
    private profileservice: ProfileFormService,
    private postal: PostalService) {

    this.createForm();

  }

  createForm() {
    this.StudentForm = this.fb.group({
      firstName: ['', Validators.required], // <--- the FormControl called "name"
      middleName: ['', Validators.required],
      lastName: '',
      summary: '',
      gender: '',
      emailId: '',
      mobile: '',
      don: '',
      nationality: '',
      aboutMe: '',
    });
  }

  ngOnInit() {
    this.getGender(1);
    this.getNationality();
  }

  getGender(id: number): void {
    this.lookup.getLookupValue(id)
      .subscribe(data => this.Gender = data);
  }

  getNationality(): void {
    this.postal.getCountryList()
      .subscribe(data => this.Country = data);
  }
  submitProfileForm() {
    const FormDetails = JSON.stringify(this.StudentForm.value);
    const StudentDetails = JSON.parse(FormDetails);
    this.profileservice.postStudentSkills(StudentDetails)
      .subscribe(res => {
        if (res) {
          alert('Details Submitted Successfully');
        }
      },
      error => alert(error), () => console.log('error'));
  }

}







