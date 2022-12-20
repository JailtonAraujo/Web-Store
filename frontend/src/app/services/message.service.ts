import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  alert ={
    message:"",
    status:""
  }

  constructor() { }

  public addMessage({message,status}:any){
    this.alert = {
      message,
      status
    }

    setTimeout(()=>{
      this.removerMessage();
    },3000)
  }

  public removerMessage (){
    this.alert = {
      message:"",
      status:""
    }
  }
}
