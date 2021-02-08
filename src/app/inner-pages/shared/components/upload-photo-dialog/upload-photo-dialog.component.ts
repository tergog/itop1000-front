import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-photo-dialog',
  templateUrl: './upload-photo-dialog.component.html',
  styleUrls: ['./upload-photo-dialog.component.scss']
})
export class UploadPhotoDialogComponent implements OnInit {

  public selectedFile: File;
  public imageSrc: string | ArrayBuffer;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  formData = new FormData();

  public inputData: {
    destination: 'Profile' | 'ProjectLogo' | 'ProjectImage' | 'Certificates',
  };


  constructor(private dialogRef: MatDialogRef<UploadPhotoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data
  ) {
    this.inputData = data;
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImage = base64ToFile(this.croppedImage);
  }

  deleteImage() {
    this.croppedImage = 'delete';
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  public onUpload(): void {

  }

  public closeDialog(): void {
    this.formData.set('image', this.croppedImage);
    this.dialogRef.close(this.formData);
  }

}
