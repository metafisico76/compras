import { Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Compras';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: ' AIzaSyDGg9uaLU_M-FCgmJkZcvwx1YKG6T1qLmw ',
      authDomain: 'comprasapp-5f265.firebaseapp.com'
    });
  }  
}
