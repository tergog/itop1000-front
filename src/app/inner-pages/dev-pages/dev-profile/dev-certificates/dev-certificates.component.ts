import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { filter, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserInfo } from 'app/shared/models';


@Component({
  selector: 'app-dev-certificates',
  templateUrl: './dev-certificates.component.html',
  styleUrls: ['./dev-certificates.component.scss']
})
export class DevCertificatesComponent implements OnInit {
  public certificates$: Observable<string[]>;
  public form: FormGroup;
  public developer: UserInfo;

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.certificates$ = this.store.select(fromCore.getUserInfo).pipe(map((dev: UserInfo) => {
      if (dev) {
        this.developer = JSON.parse(JSON.stringify(dev));
      }
      if (this.developer.devProperties.certificates) {
        return [...this.developer.devProperties.certificates];
      }
      return [];
    }));
  }

  private uploadImage(certificate: string): void {
    this.devProfileService.onUploadCertificate(certificate);

  }

  public addCertificates(): void {
    const dialogConfig = {
      data: {
        destination: 'Certificates'
      }
    };

    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((certificate: string) => this.uploadImage(certificate));
  }

  public deleteCertificate(url: string, index: number): void {
    this.devProfileService.onDeleteCertificate(url, index);
  }

}
