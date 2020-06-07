import { Injectable } from '@angular/core';
// import { Headers, Http, Response } from '@angular/common/http'; viejo
import { HttpClient, HttpHeaders } from '@angular/common/http';

// tslint:disable-next-line: import-blacklist
// import 'rxjs/Rx';
// import {catchError, retry, tap} from 'rxjs/internal/operators';
import { retry,catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { error } from 'util';
import { Presupuesto } from '../modelos/presupuesto.modelo';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presURL = 'https://comprasapp-5f265.firebaseio.com/presupuestos.json';
  presURL2 = 'https://comprasapp-5f265.firebaseio.com/presupuestos';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postPresupuesto( presupuesto: any): Observable<any> {
    const newpres = JSON.stringify(presupuesto);

    return this.http.post( this.presURL, newpres, this.httpOptions);

   /* const headers = new Headers({
    'Content-Type': 'application/json'
    });*/
   /* return this.http.post( this.presURL, newpres, this.httpOptions)
    .pipe( res => {
    console.log(res.json());
    return res.json();
    });*/

   /* return this.http.post( this.presURL, newpres, this.httpOptions)
    // tslint:disable-next-line: deprecation
    .pipe( tap(_ => this.log('anadido presupuesto ' + newpres)),
      catchError(this.handleError<any>('postPresupuesto'))
    );

    postExample(test_object: ObjectType): Observable<any>{
      return this.http.post('http://jsonplaceholder.typicode.com/posts', test_object});
    }*/


 /*      // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }*/
  }
    // tslint:disable-next-line: ban-types
    handleError<T>(arg0: string): (err: any, caught: Observable<Object>) => import('rxjs').ObservableInput<any> {
      throw new Error('Method not implemented.');
    }

    private log(message: string) {
      console.log(message);
    }

   /* getPresupuestos() {
      return this.http.get( this.presURL );
      // .map( res => res.json());
    }*/

    /** GET heroes from the server */
   /* getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
          .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
          );
      }*/

      // GET
      getPresupuestos(): Observable<Presupuesto> {
        return this.http.get<Presupuesto>(this.presURL)
        .pipe(
          retry(1),
          catchError(this.errorHandl)
        );
      }

      
      // GET with id
      getPresupuesto(id$: string): Observable<Presupuesto> {
        return this.http.get<Presupuesto>(this.presURL2 + '/'+ id$ +'.json' )
        .pipe(
          retry(1),
          catchError(this.errorHandl)
        );
      }

      // PUT editpres/
      putPresupuesto(data, id): Observable<Presupuesto> {
        return this.http.put<Presupuesto>(this.presURL2 + '/' + id +'.json', JSON.stringify(data), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.errorHandl)
        )
      }

      /*putPresupuesto( presupuesto: any, id$: string) {
        const newpre = JSON.stringify(presupuesto);
        const headers = new Headers({
        'Content-Type': 'application/json'
        });
        const url = '${ this.preURL }/${ id$ }.json';
        return this.http.put( url, newpre, httpOptions)
          .map( res => {
          console.log(res.json());
          return res.json();
          })
        }*/

      /*  delPresupuesto ( id$: string ) {
          const url = `${ this.preURL }/${ id$ }.json`;
          return this.http.delete( url )
          .map( res => res.json());
          } */

      // DELETE
      delPresupuesto(id){
        return this.http.delete<Presupuesto>(this.presURL2 + '/' + id +'.json', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.errorHandl)
        )
      }

      // Error handling
      errorHandl(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }
}
