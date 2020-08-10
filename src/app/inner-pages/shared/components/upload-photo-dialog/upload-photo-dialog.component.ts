import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private dialogRef: MatDialogRef<UploadPhotoDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.selectedFile);
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
    // upload code goes here
  }

  public closeDialog(): void {
    this.dialogRef.close(this.croppedImage);
  }

}
