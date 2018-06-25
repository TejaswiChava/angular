import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';


@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {
  foods: any = [];
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  DegreeForm: FormGroup;
  createForm() {
    this.DegreeForm = this.fb.group({
      startDate: ['']
    });
  }
  ngOnInit() {
  }

}
