import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-response',
  template: `<h2>Sorry No Data Found !</h2>`
})

export class NoResponseComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
