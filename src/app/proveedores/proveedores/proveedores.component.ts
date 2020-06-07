import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../servicios/proveedores.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
 
// proveedores: any;
proveedoresList: any = [];
campoBusqueda: FormControl;
busqueda: string;
cargando = false;
resultados = false;
noresultados = false;

  constructor(public proveedoresService: ProveedoresService) {
    
      this.proveedoresService.getProveedores().subscribe(proveedores => {
        for ( const id$ in proveedores) {
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedoresList.push(proveedores[id$]);
        }
        this.cargando = false;
      /*  tambien funciona
      this.proveedoresService.getProveedores().subscribe((data : {}) => {  
          for ( const id$ in data) {
            const p = data[id$];
            p.id$ = id$;
            this.proveedoresList.push(data[id$]);
          }    */   
      });   
   }

  ngOnInit() {
   // this.proveedores = this.proveedoresService.getProveedores();    
      this.campoBusqueda = new FormControl();
      this.campoBusqueda.valueChanges.subscribe(term => {
        this.busqueda = term;
        this.cargando = true;
        if (this.busqueda.length !== 0) {
          this.proveedoresService.getProveedoresSearch(this.busqueda).subscribe(proveedores => {
            this.proveedoresList = [];
            for ( const id$ in proveedores) {
              const p = proveedores[id$];
              p.id$ = id$;
              this.proveedoresList.push(proveedores[id$]);
            }
            if (this.proveedoresList.length < 1 && this.busqueda.length >= 1) {
              this.noresultados = true;
            } else {
              this.noresultados = false;
            }
          })
          this.cargando = false;
          this.resultados = true;
        } else {
          this.proveedoresList = [];
          this.cargando = false;
          this.resultados = false;
        }
      });
  }

  eliminarProveedor(id$) {
    this.proveedoresService.delProveedor(id$)
    .subscribe( res => {
      console.log(res);
      // refrescamos la pantalla
      this.proveedoresList = [];
      this.proveedoresService.getProveedores().subscribe((data : {}) => { 
        for ( const id$ in data) {
          const p = data[id$];
          p.id$ = id$;
          this.proveedoresList.push(data[id$]);
        }   
      })
    });
  }

}
