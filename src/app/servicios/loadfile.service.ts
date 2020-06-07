import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { Archivo } from '../upload/file.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoadfileService {

  private basePath:string = '/uploads/';

  constructor(private storage: AngularFireStorage, private angularFireDatabase : AngularFireDatabase) { }



    //Tarea para subir archivo
    public tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
      this.saveFileData(datos);
    }

    private saveFileData(upload: Archivo) {
      this.angularFireDatabase.list(this.basePath).push(upload);
    }
  
    //Referencia del archivo
    public referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }



    //borrado de ficheros
    deleteUpload(upload: Archivo) {
      this.deleteFileData(upload.$key)
      .then( () => {
      this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
    }

    private deleteFileData(key: string) {
       return this.angularFireDatabase.list(this.basePath).remove(key);
    }
    private deleteFileStorage(name:string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(this.basePath+name).delete()
    }


  //pushUpload(upload: Archivo) {
  /*  const storageRef = firebase.storage().ref();
    const uploadTask =
    storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
    // upload in progress
    upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },
    (error) => {
    // upload failed
    console.log(error)
    },
    () => {
    // upload success
    upload.url = uploadTask.snapshot.downloadURL
    upload.name = upload.file.name
    this.saveFileData(upload)
    }
    );
    }*/

  /*  private saveFileData(upload: Archivo) {
      this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    } */
}
