import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

 import { AcademicsService } from './../../../../services/students/form/academics.service';
import { LookupvalueService } from './../../../../services/shared/lookupvalue.service';
@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css'],
})
export class AcademicsComponent implements OnInit {

  durationtype: any;
  constructor(private fb: FormBuilder,
              private academicsService: AcademicsService,
              private lookupvalue: LookupvalueService
  ) {
    this.createForm();
  }

  AdditionalInfoForm: FormGroup;
  createForm() {
    this.AdditionalInfoForm = this.fb.group({
      instituteName: '',
      scoreGrade: '',
      Duration: '',
      DurationtypeValueId: '',
      comment: ''
    });
  }

  submitAdditionalInfoForm(): void {
    const FormDetails = JSON.stringify(this.AdditionalInfoForm.value);
    const AcademicsData = JSON.parse(FormDetails);
    this.academicsService.postAcademicsData(AcademicsData)
      .subscribe(res => {
        if (res) {
          alert('Details Submitted Successfully');
        }
      },
      error => alert(error), () => console.log('error'));
  }

  getDurationType(id: number): void {
    this.lookupvalue.getLookupValue(42)
        .subscribe(data => this.durationtype = data);
  }
ngOnInit() {
    this.getDurationType(42);
}

}
