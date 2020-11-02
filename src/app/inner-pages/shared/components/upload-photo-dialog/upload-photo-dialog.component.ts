import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DevelopersService } from '../../../../shared/services';
import { first } from "rxjs/operators";

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
    destination: 'project',
    id: number
  };


  constructor(private dialogRef: MatDialogRef<UploadPhotoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private developersService: DevelopersService
  ) {
    this.inputData = data;
  }

  ngOnInit(): void {
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = e => this.imageSrc = reader.result;
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
    // if (this.inputData.destination === 'project')  {
    //   this.developersService.uploadProjectImage(this.inputData.id, this.imageSrc)
    //     .pipe(first())
    //     .subscribe(
    //       ({url}) => console.log(url)
    //     );
    // }
  }

  public closeDialog(): void {
    this.dialogRef.close(this.croppedImage);
  }

}
