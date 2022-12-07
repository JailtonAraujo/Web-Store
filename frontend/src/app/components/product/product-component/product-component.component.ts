import { Component, OnInit } from '@angular/core';
import { faHeart as faHeartSolid, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.sass']
})
export class ProductComponentComponent implements OnInit {

  constructor() { }

  iconFavority = faHeartRegular;
  isFavority:Boolean = false;

  ngOnInit(): void {
  }

  public chengeIconFavority(){
      this.isFavority = !this.isFavority;
      this.isFavority ? this.iconFavority = faHeartSolid : this.iconFavority = faHeartRegular
  }

}
