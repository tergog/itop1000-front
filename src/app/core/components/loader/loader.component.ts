import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getClientLoading, getDevelopersLoading, State } from 'app/core/reducers';
import { Observable, merge } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isLoading$ = merge(
      this.store.select(getDevelopersLoading),
      this.store.select(getClientLoading)
    );
  }

  ngOnInit() {
  }

}
