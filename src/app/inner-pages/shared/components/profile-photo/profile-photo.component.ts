import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UserService } from 'app/shared/services';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePhotoComponent implements OnInit {

  @Output() updatePhoto = new EventEmitter<string>();
  @Input() img: string;
  @Input() isEdit: boolean;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onAddPhoto(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: 'Profile'
    };
    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed().pipe(
        filter(res => res),
        switchMap(res => this.userService.uploadPhoto(res))
    )
      .subscribe(({ photo }) => this.uploadPhotoSuccess(photo));
  }

  onEditPhoto(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: 'Profile',
      img: this.img
    };
    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed().pipe(
      filter(res => res),
      switchMap(res => this.userService.uploadPhoto(res))
    )
      .subscribe(({ photo }) => this.uploadPhotoSuccess(photo));
  }

  uploadPhotoSuccess(image: string): void {
    this.updatePhoto.emit(image);
  }

  onDelete(): void {
    this.updatePhoto.emit('');
  }
}
