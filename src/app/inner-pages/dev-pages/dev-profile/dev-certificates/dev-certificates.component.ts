import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { filter, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { DevelopersService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';


@Component({
  selector: 'app-dev-certificates',
  templateUrl: './dev-certificates.component.html',
  styleUrls: ['./dev-certificates.component.scss']
})
export class DevCertificatesComponent implements OnInit, OnDestroy {
  public certificates: string[] = [];
  public form: FormGroup;
  public developer: UserInfo;
  public subscription: Subscription;

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select(fromCore.getUserInfo).subscribe((dev: UserInfo) => {
      if (dev) {
        this.developer = JSON.parse(JSON.stringify(dev));
      }
      if (this.developer.devProperties.certificates) {
        this.certificates = [...this.developer.devProperties.certificates];
      }
    });
  }

  private onSaveCertificates(): void {
    if (this.developer.devProperties.certificates !== this.certificates) {
      this.developer.devProperties.certificates = this.certificates;
      this.devProfileService.onSaveClick(this.developer);
    }
  }

  private uploadImage(certificate: string): void {
    this.developersService.uploadCertificate(certificate)
      .subscribe(
        (url) => {
          this.certificates.push(url);
          this.onSaveCertificates();
        },
        ({ error }) => console.log(error)
      );
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
    this.developersService.deleteCertificate(url).subscribe(
      () => {
        this.certificates.splice(index, 1);
        this.onSaveCertificates();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
