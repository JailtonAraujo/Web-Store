import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  formUser!:FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.formUser = new FormGroup({
      name : new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      email : new FormControl('',Validators.required),
      cpf : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required,Validators.minLength(8)])

    })

  }


  public handlerSubmit(){
    console.log(this.formUser.value);
  }

}
