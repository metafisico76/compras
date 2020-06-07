import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { Routes, RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { FormsModule} from '@angular/forms';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PresupuestosService } from './servicios/presupuestos.service';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { GuardService } from './servicios/guard.service';
import { FacturasModule } from './facturas/facturas.module';
import { FacturasComponent } from './facturas/facturas/facturas.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './config/firebaseConfig';
import { UploadComponent } from './upload/upload.component';
import { LoadfileService } from './servicios/loadfile.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ContratosComponent } from './contratos/contratos.component';
import { EditprovComponent } from './proveedores/editprov/editprov.component';
// libreria para los graficos https://valor-software.com/ng2-charts/
import { ChartsModule } from 'ng2-charts';
import { LinechartComponent } from './graficos/linechart/linechart.component';
import { BarchartComponent } from './graficos/barchart/barchart.component';
import { DoughnutchartComponent } from './graficos/doughnutchart/doughnutchart.component';
import { RadarchartComponent } from './graficos/radarchart/radarchart.component';
import { PiechartComponent } from './graficos/piechart/piechart.component';
import { PolarAreachartComponent } from './graficos/polar-areachart/polar-areachart.component';
import { BubblechartComponent } from './graficos/bubblechart/bubblechart.component';
import { ScatterchartComponent } from './graficos/scatterchart/scatterchart.component';
import { DynamicchartComponent } from './graficos/dynamicchart/dynamicchart.component';
import { FinancialchartComponent } from './graficos/financialchart/financialchart.component';
// fin libreria para los graficos https://valor-software.com/ng2-charts/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule , MatPaginatorModule, MatFormFieldModule, MatSortModule,
  MatToolbarModule, 
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule ,
  MatStepperModule,
  MatInputModule} from '@angular/material';

//import { MatSelectModule } from '@angular/material/select';

/* Sin proteccion de rutas
const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'proveedores', component: ProveedoresComponent},
  { path: 'addprovee', component: AddproveeComponent},
  { path: 'addpres', component: AddpresComponent},
  { path: 'presupuestos', component: PresupuestosComponent },
  { path: 'editpres/:id', component: EditpresComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciosesion', component: InisesComponent },
  { path: '**', component: InicioComponent}
]; */

// Añadir proteccion de rutas
const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proveedores', component: ProveedoresComponent, canActivate:  [GuardService]},
  { path: 'addprovee', component: AddproveeComponent, canActivate:  [GuardService]},
  { path: 'editprov/:id', component: EditprovComponent, canActivate:  [GuardService]},
  { path: 'addpres', component: AddpresComponent, canActivate:  [GuardService]},
  { path: 'presupuestos', component: PresupuestosComponent, canActivate:  [GuardService]},
  { path: 'editpres/:id', component: EditpresComponent, canActivate:  [GuardService]},
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciosesion', component: InisesComponent },
  { path: 'facturas', component: FacturasComponent, canActivate:  [GuardService]},
  { path: 'uploads', component: UploadComponent },
  { path: 'contratos', component: ContratosComponent, canActivate:  [GuardService]},
  { path: 'graficoLinechart', component: LinechartComponent },
  { path: 'graficoBarchart', component: BarchartComponent },
  { path: 'graficoDoughnutchart', component: DoughnutchartComponent },  
  { path: 'graficoRadarchart', component: RadarchartComponent },
  { path: 'graficoPiechart', component: PiechartComponent },
  { path: 'graficoPolarAreachart', component: PolarAreachartComponent },
  { path: 'graficoBubblechart', component: BubblechartComponent },
  { path: 'graficoScatterchart', component: ScatterchartComponent },
  { path: 'graficoDynamicchart', component: DynamicchartComponent },
  { path: 'graficoFinancialchart', component: FinancialchartComponent },
  { path: '**', component: InicioComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    UploadComponent,
    ContratosComponent,
    EditprovComponent,
    LinechartComponent,
    BarchartComponent,
    DoughnutchartComponent,
    RadarchartComponent,
    PiechartComponent,
    PolarAreachartComponent,
    BubblechartComponent,
    ScatterchartComponent,
    DynamicchartComponent,
    FinancialchartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FacturasModule,
    //AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule ,
    MatStepperModule,
    MatInputModule
  ],
  providers: [ProveedoresService, PresupuestosService,AutenticacionService, LoadfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
