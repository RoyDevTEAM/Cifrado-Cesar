import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CifradoComponent } from './components/cifrado/cifrado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },            // Ruta para el componente de inicio
  { path: 'cifrado', component: CifradoComponent },  // Ruta para el componente de cifrado
  { path: '**', redirectTo: '' }                     // Redirección a inicio para rutas desconocidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
