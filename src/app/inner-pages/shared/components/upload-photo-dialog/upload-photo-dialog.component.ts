import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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

  public inputData: {
    destination: 'Profile' | 'Project',
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
    this.dialogRef.close(this.croppedImage);
  }

}
