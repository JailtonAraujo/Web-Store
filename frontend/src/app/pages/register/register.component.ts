import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  hideBtn = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor() { }

  ngOnInit(): void {
  }

}
