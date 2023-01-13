import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingReducer:Store<{loadingReducer:Boolean }>) { }

  loading$ = this.loadingReducer.select('loadingReducer').pipe(map((state)=>state));

  ngOnInit(): void {

  }

}
