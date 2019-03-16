import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

const routes: Routes = [{
  path: 'admin', component: LoginComponent
}, {
  path: 'home', component: HomeComponent
}, {
  path: 'admin/panel', component: AdminPanelComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
