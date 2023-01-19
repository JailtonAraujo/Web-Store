import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdressModel } from 'src/app/model/adressModel';
import { FreteService } from 'src/app/services/frete.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/model/UserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  faPlus = faPlus;
  allAdress:Array<AdressModel>=[];

  hideBtn01 = true;
  hideBtn02 = true;
  hideBtn03 = true;

  formProfile!:FormGroup;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  modalRef?: BsModalRef;

  formAddress!:FormGroup;

  currentUSer!:UserModel;

  constructor(
    private freteService:FreteService,
    private modalService: BsModalService,
    private toastrService:ToastrService,
    private userService:UserService
  ) { }

  ngOnInit(): void {

    this.formAddress = new FormGroup({
      cep : new FormControl('' ,[Validators.required,Validators.minLength(8)]),
      uf : new FormControl('' ),
      city : new FormControl('' ),
      logradouro : new FormControl('' ,[Validators.required]),
      number : new FormControl('' ,[Validators.required]),
      complement: new FormControl('',[Validators.required]),
      whoReceive: new FormControl('',[Validators.required])
    })

    this.formProfile = new FormGroup({
      email: new FormControl(''),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      oldPassword: new FormControl('',[Validators.required])
    })

    this.getAllAddressUser();
    this.getCurrentUser();

  }

  public getAllAddressUser(){
    this.freteService.findAllAddress().subscribe((adresss)=>{
      this.allAdress = adresss;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //Search informations cep in Api via cep and seting listAddress
  public searchCep(event:any){
    const input = event.target as HTMLInputElement;
    const value =  input.value;

    this.formAddress.get('uf')?.setValue("...");
    this.formAddress.get('city')?.setValue("...");

    this.freteService.searchCep(value).subscribe((result)=>{

      this.formAddress.get('uf')?.setValue(result.uf);
      this.formAddress.get('city')?.setValue(result.localidade);
      
    }, error=>{
      this.formAddress.get('uf')?.setValue("");
      this.formAddress.get('city')?.setValue("");
    })
   
  }


  public addAddress(){

    this.freteService.saveAddress(this.formAddress.value).subscribe((response)=>{

      this.allAdress.push(response);

      this.modalRef?.hide()

      this.toastrService.success('Novo Endereço adicionado','');

    })

}


public DeleteAddress(index:number){

  this.freteService.deleteAddress(Number(this.allAdress[index].id)).subscribe((response)=>{

    this.allAdress.splice(index,1);

    this.toastrService.success('Endereço removido!','');

  })
}

public updateProfile(){

  this.userService.updateProfile(this.formProfile.value);

}

private getCurrentUser (){

  this.userService.getCurrentUser().subscribe((response)=>{
    this.currentUSer = response;
    this.formProfile.get('email')?.setValue(response.username);
  })

}

public askMoney(){

  if(Number(this.currentUSer.wallet) > 700){
    this.toastrService.warning('Você ainda tem saldo sulficiente!','');
    return;
  }

  this.userService.asMoreMoney();

}

}