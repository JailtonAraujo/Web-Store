import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  hideBtn = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  ngOnInit(): void {
  }

  public testart(){
    this.messageService.addMessage({message:'Deu um arror aqui',status:'alert-danger'});
  }

}
