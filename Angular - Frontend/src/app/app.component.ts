import { Component } from '@angular/core';
import { UploadFileService } from './Services/upload-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  file:string;

  constructor(private uploadService: UploadFileService, private https:HttpClient){}

  viewFile()
  {
    window.open('https://bucketName.s3.cloudLocation.amazonaws.com/'+this.file);
  }

  deleteFile()
  {
    this.https.post<string>('http://localhost:8080/deleteFile',this.file).subscribe(
      res => {
        this.file = res;
      }
    );
  }

  change(event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    this.selectedFiles = undefined;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}