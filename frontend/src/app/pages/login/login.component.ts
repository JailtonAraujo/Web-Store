import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
  }

  public testart(){
    this.messageService.addMessage({message:'Deu um arror aqui',status:'alert-danger'});
  }

}
