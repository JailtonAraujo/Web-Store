import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() emiterNameSearch = new EventEmitter<String>();

  nameSearch:String = "";

  faSearch = faSearch;
  faCart = faCartShopping

  

  constructor() { }

  ngOnInit(): void {
  }

  handleNameSearch(){
    this.emiterNameSearch.emit(this.nameSearch);
  }

}
