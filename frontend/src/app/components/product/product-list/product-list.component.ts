import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  @Input() ListProduct!:Array<Product>;
  @Input() totalElements!:number;
  @Output() offset = new EventEmitter<Number>();

  //Paginations
  itensPerPage:Number = 5;
  p:any;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  
  }

  changePage(event:any){
      const offset = (Number(event-1) * Number(16));
      this.offset.emit(offset);

  }

}
