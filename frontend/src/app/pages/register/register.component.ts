import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  hideBtn = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  formUser!:FormGroup;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.formUser = new FormGroup({
      name : new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      username : new FormControl('',Validators.required),
      cpf : new FormControl('',[Validators.required,Validators.maxLength(14)]),
      password : new FormControl('',[Validators.required,Validators.minLength(8)])

    })

  }


  public handlerSubmit(){

    this.authService.register(this.formUser.value);
  }

}
