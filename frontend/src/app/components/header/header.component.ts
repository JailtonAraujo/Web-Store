import { Component, OnInit } from '@angular/core';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  faSearch = faSearch;
  faCart = faCartShopping

  constructor() { }

  ngOnInit(): void {
  }

}
