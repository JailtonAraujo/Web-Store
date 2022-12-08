import { Component, OnInit } from '@angular/core';
import { faHeart as faHeartSolid, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  //Icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faTruckFast = faTruckFast;

  constructor() { }

  ngOnInit(): void {
  }

}
