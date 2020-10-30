import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Developer } from 'app/shared/models';
import { DevelopersService } from 'app/shared/services';
import { getDevelopers, State } from 'app/core/developers';
import { updateDeveloper } from 'app/core/developers/developers.actions';

@Component({
  selector: 'app-search-developers',
  templateUrl: './search-developers.component.html',
  styleUrls: ['./search-developers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDevelopersComponent implements OnInit {

  public developers$: Observable<Developer[]>;

  constructor(
    private developersService: DevelopersService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.developers$ = this.store.select(getDevelopers);
  }

  public onProfileClick(id: string): void {
    this.store.dispatch(updateDeveloper({id}));
    this.router.navigate(['in/c/search-developers', id]);
  }

}
