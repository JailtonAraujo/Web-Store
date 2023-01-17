import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private toastService:ToastrService
    ) { }

  hideBtn = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  formUser!:FormGroup;

  ngOnInit(): void {
    this.formUser = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }


  public handerLogin(){
    this.authService.authenticate(this.formUser.value);
  }


}
