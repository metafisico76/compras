import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry,catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Proveedor } from '../modelos/proveedor.modelo';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  provURL = 'https://comprasapp-5f265.firebaseio.com/proveedores.json';
  provURL2 = 'https://comprasapp-5f265.firebaseio.com/proveedores';

  constructor(private http: HttpClient) { }

 /* proveedores: any = [{
    id: 'AAX',
    nombre: 'Telefónica',
    cif: 'B12345678',
    direccion: 'Paseo de la Castellana, 100',
    cp: '28.010',
    localidad: 'Madrid',
    provincia: 'Madrid',
    telefono: 911111111,
    email: 'info@telefonica.com',
    contacto: 'Juan Pérez'
  },
  {
    id: 'ABX',
    nombre: 'Iberdrola',
    cif: 'B987654321',
    direccion: 'Principe de Vergara, 200',
    cp: '28.015',
    localidad: 'Madrid',
    provincia: 'Madrid',
    telefono: 922222222,
    email: 'info@iberdrola.com',
    contacto: 'Laura Martínez'
  }
];

  getProveedores(){
    return this.proveedores;
  }*/

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // POST
  postProveedor( proveedor: any): Observable<any> {
    const newprovs = JSON.stringify(proveedor);
    return this.http.post( this.provURL, newprovs, this.httpOptions);  
  }

  // GET
  getProveedores(): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.provURL)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getProveedoresSearch(busqueda: string) {
    // este no funciona
    // const url = '${ this.provURL }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"';
    //const url = this.provURL +'?orderBy="nombre"&startAt="'+ busqueda +'"&endAt="'+ busqueda+'"';
    const url = this.provURL +'?orderBy="nombre"&startAt="'+ busqueda+'"';
    return this.http.get<Proveedor>(url)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

    // GET with id
    getProveedor(id$: string): Observable<Proveedor> {
      return this.http.get<Proveedor>(this.provURL2 + '/'+ id$ +'.json' )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }

    // PUT editpres/
    putProveedor(data, id): Observable<Proveedor> {
      return this.http.put<Proveedor>(this.provURL2 + '/' + id +'.json', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }


  // DELETE
  delProveedor(id){
    return this.http.delete<Proveedor>(this.provURL2 + '/' + id +'.json', this.httpOptions)
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
