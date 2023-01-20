import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  hideBtn = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  formUser!:FormGroup;

  ngOnInit(): void {

    if(localStorage.getItem('auth') !== null){
      this.router.navigate(['/'])
    }
    this.formUser = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }


  public handerLogin(){
    this.authService.authenticate(this.formUser.value);
  }


}
