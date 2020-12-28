import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
export class SearchDevelopersComponent implements OnInit, OnDestroy {

  public developers: Developer[] = [];
  public developersPaginated: Developer[] = [];

  constructor(
    private developersService: DevelopersService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(getDevelopers)
      .pipe(untilDestroyed(this))
      .subscribe(developers => {
        this.developers = developers;
        this.developersPaginated = this.developers.slice(0, 2);
    });
  }

  onPageChange($event): void {
    this.developersPaginated = this.developers.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  public onProfileClick(id: string): void {
    this.store.dispatch(updateDeveloper({id}));
    this.router.navigate(['in/c/search-developers', id]);
  }

  ngOnDestroy(): void {
  }

}
