import { Component, OnInit } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.sass']
})
export class FinalizeOrderComponent implements OnInit {

  faWallet=faWallet;

  constructor() { }

  ngOnInit(): void {
  }

}
