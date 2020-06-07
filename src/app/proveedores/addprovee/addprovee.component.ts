import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/modelos/proveedor.modelo';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.scss']
})
export class AddproveeComponent implements OnInit {

  @ViewChild('formpro', {static: false}) formpro: NgForm;

  proveedor: Proveedor;
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza' ];

  constructor(private router: Router,
              private proveedoresService : ProveedoresService) {
    this.proveedor = {
      nombre: '',
      cif: '',
      direccion: '',
      cp: '',
      localidad: '',
      provincia: '',
      telefono: null,
      email: '',
      contacto: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    /* this.formpro.reset();*/
    this.proveedor = this.saveProveedor();
    this.proveedoresService.postProveedor( this.proveedor )
      .subscribe(newpres => {
        console.log(newpres);
        this.router.navigate(['/proveedores'])
      });

  }

  saveProveedor() {
    const saveProveedor = {     
    nombre : this.formpro.value.nombre,
    cif : this.formpro.value.cif,
    direccion : this.formpro.value.direccion,
    cp : this.formpro.value.cp,
    localidad : this.formpro.value.localidad,
    provincia : this.formpro.value.provincia,
    telefono : this.formpro.value.telefono,
    email : this.formpro.value.email,
    contacto : this.formpro.value.contacto
    };
    return saveProveedor;
  }
}
