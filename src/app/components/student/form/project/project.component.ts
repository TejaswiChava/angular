import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AcademicsService } from './../../../../services/students/form/academics.service';
import { LookupvalueService } from './../../../../services/shared/lookupvalue.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  foods: any = [];
  durationtype: any;

  constructor(private fb: FormBuilder,
              private academicsService: AcademicsService,
              private lookupvalue: LookupvalueService) {
    this.createForm();
  }

  ProjectForm: FormGroup;
  createForm() {
    this.ProjectForm = this.fb.group({
      programName: '',
      instituteName: '',
      duration: '',
      DurationtypeValueId: '',
      comment: ''
    });

  }

  submitAdditionalInfoForm(): void {
    const FormDetails = JSON.stringify(this.ProjectForm.value);
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
