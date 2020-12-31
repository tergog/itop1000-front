import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { GetPaidNowDialogComponent } from 'app/inner-pages/shared/components/get-paid-now-dialog/get-paid-now-dialog.component';

@Component({
  selector: 'app-dev-profile-balance',
  templateUrl: './dev-profile-balance.component.html',
  styleUrls: ['./dev-profile-balance.component.scss']
})
export class DevProfileBalanceComponent implements OnInit, OnDestroy {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onGetClick(): void {
    const dialogRef = this.matDialog.open(GetPaidNowDialogComponent);
    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(res => console.log(res));
  }

  public onEditClick(): void {}

  ngOnDestroy(): void {}

}
