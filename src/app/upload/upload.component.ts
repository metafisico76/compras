import { Component, OnInit } from '@angular/core';
import { Archivo } from './file.model';
import { LoadfileService } from '../servicios/loadfile.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Archivo;
  loading = false;
  file: any;

  constructor( public loadfileService: LoadfileService ) { }
  
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  ngOnInit() {
  }

  /*uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadfileService.pushUpload(this.currentUpload);
  } */


  setectedFiles(event){
    this.file = event.target.files[0];
  }

  uploadSingle(event) {
    // Get input file
    //const file = event.target.files[0];
   // const file = this.selectedFiles.item(0);
    const file = this.file;
    this.currentUpload = new Archivo(file);
    this.loading = true;

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
   
    const filepath = 'images/'+randomId;
 
    const fileRef = this.loadfileService.referenciaCloudStorage(filepath);

    // Upload image
    //const task = this.storage.upload(filepath, file);
    const task = this.loadfileService.tareaCloudStorage(filepath, file);
    
    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(finalize(() => this.uploadURL = fileRef.getDownloadURL())).subscribe();
  }
}
