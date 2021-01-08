import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
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
  public userInfo$: Subscription;
  public canEdit = true;
  public logoUrl: string;
  public developer: UserInfo;

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService,
  ) {
  }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo).subscribe((dev: UserInfo) => {
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

  private uploadImage(image: string, forLogo: boolean): void {
    this.developersService.uploadCertificate(image)
      .subscribe(
        (url) => {
          forLogo ? this.logoUrl = url : this.certificates.push(url);
          this.onSaveCertificates();
        },
        ({error}) => console.log(error)
      );
  }

  public addCertificates(forLogo: boolean = false): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: 'Certificates'
    };

    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((image: string) => this.uploadImage(image, forLogo));
  }

  public deleteCertificate(url): void {
    this.developersService.deleteCertificate(url).subscribe(
      () => {
        const index = this.certificates.indexOf(url);
        this.certificates.splice(index, 1);
        this.onSaveCertificates();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.userInfo$.unsubscribe();
  }
}
