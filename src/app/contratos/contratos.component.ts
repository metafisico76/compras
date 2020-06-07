//import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable } from 'angularfire2/database';
import { LoadfileService } from '../servicios/loadfile.service';
import { Archivo } from '../upload/file.model';


import { Component, OnInit,ViewChild } from '@angular/core';
import { PresupuestosService } from '../servicios/presupuestos.service';
import { Presupuesto } from 'src/app/modelos/presupuesto.modelo';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {
  presupuestosList: any = [];
  displayedColumns: string[] = ['proveedor', 'concepto', 'base', 'iva',
   'total', 'tipo', 'fecha', 'acciones'];

  dataSource: MatTableDataSource<Presupuesto>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private loadfileService: LoadfileService,
    private presupuestosService: PresupuestosService) {        
        this.presupuestosService.getPresupuestos().subscribe((data : {}) => {          
            for ( const id$ in data) {
              const p = data[id$];
              p.id$ = id$;
              this.presupuestosList.push(data[id$]);
            }                       
            this.dataSource = new MatTableDataSource(this.presupuestosList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;    
        });         
   }

  ngOnInit() {
    // this.uploads = this.loadfileService.getUploads();
  }

  getUploads() {
    /* this.uploads = this.angularFireDatabase.list(this.basePath);
     return this.uploads;*/
  }  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$)
    .subscribe( res => {
      console.log(res);
      // refrescamos la pantalla
      this.presupuestosList = [];
      this.presupuestosService.getPresupuestos().subscribe((data : {}) => { 
        for ( const id$ in data) {
          const p = data[id$];
          p.id$ = id$;
          this.presupuestosList.push(data[id$]);
        }   
      })
    });
  }

}



