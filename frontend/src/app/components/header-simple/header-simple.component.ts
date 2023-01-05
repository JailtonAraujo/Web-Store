import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.sass']
})
export class HeaderSimpleComponent implements OnInit {

  @Input() titleHeader="";

  constructor() { }

  ngOnInit(): void {
  }

}
