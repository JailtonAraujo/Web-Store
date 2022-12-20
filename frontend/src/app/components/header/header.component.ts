import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() emiterNameSearch = new EventEmitter<String>();
  @Output() emiterCategory = new EventEmitter<Number>();
  @Output() emiterOfferOfDay = new EventEmitter<Number>();

  nameSearch:String = "";

  faSearch = faSearch;
  faCart = faCartShopping

  

  constructor() { }

  ngOnInit(): void {
  }

  handleNameSearch(){
    this.emiterNameSearch.emit(this.nameSearch);
  }

  public handleSearchByCategory(num:Number){
    this.emiterCategory.emit(num);
  }

  public handlerOfferOfDay(){
    this.emiterOfferOfDay.emit(1);
  }

}
