import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.scss']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  proveedores: any = [];

  // tslint:disable-next-line: align
  constructor(private pf: FormBuilder,
              private router: Router, 
              private presupuestoService: PresupuestosService,
              private activatedRouter: ActivatedRoute,
              private proveedoresService: ProveedoresService) {
                //this.proveedores = this.proveedoresService.getProveedores();
                this.proveedoresService.getProveedores()
                  .subscribe(proveedores => {
                    for ( const id$ in proveedores) {
                      const p = proveedores[id$];
                      p.id$ = id$;
                      this.proveedores.push(proveedores[id$]);
                    }
                  });
    }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: this.iva ,
      total: this.total
    });
    this.onChanges();
  }

  onChanges() {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto( this.presupuesto )
      .subscribe(newpres => {
        console.log(newpres);
        this.router.navigate(['/presupuestos'])
      });
  }

  savePresupuesto() {
    const savePresupuesto = {
    proveedor: this.presupuestoForm.get('proveedor').value,
    fecha: this. presupuestoForm.get('fecha').value,
    concepto: this.presupuestoForm.get('concepto').value,
    base: this.presupuestoForm.get('base').value,
    tipo: this.presupuestoForm.get('tipo').value,
    iva: this.presupuestoForm.get('iva').value,
    total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }
}
