import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChangePasswordDialogComponent } from 'app/inner-pages/shared/components/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {

  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {
  }

  public onEditClick(): void {
    this.matDialog.open(ChangePasswordDialogComponent)
  }

}
