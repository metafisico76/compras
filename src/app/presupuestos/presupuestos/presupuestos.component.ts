import { Component, OnInit,ViewChild } from '@angular/core';
import { PresupuestosService} from '../../servicios/presupuestos.service';
import { Presupuesto } from 'src/app/modelos/presupuesto.modelo';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit {

  presupuestosList: any = [];

  displayedColumns: string[] = ['proveedor', 'concepto', 'base', 'iva',
   'total', 'tipo', 'fecha', 'acciones'];

  dataSource: MatTableDataSource<Presupuesto>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private presupuestosService: PresupuestosService) {
   /* this.presupuestosService.getPresupuestos().subscribe(presupuestos => {
      for ( const id$ of presupuestos) {
        const p = presupuestos[id$];
        p.id$ = id$;
        this.presupuestos.push(presupuestos[id$]);
      }
    });*/
     
      //this.presupuestosService.getPresupuestos().subscribe((data : Presupuesto) => {   
        this.presupuestosService.getPresupuestos().subscribe((data : {}) => {   
            //this.presupuestos.push(presupuesto);
            //this.presupuestosList = data.result;
            //this.presupuestosList = new Array<Presupuesto>(data);
          /* this.presupuestosList.push(data['-LyB3OoYy4n-y7sGxb8E']);
            console.log(this.presupuestosList );*/
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
