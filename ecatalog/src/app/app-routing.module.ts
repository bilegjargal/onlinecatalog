import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const APP_ROUTES: Routes = [{
  path: 'admin', component: LoginComponent
}, {
  path: 'home', component: HomeComponent
}, {
  path: 'admin/panel', component: AdminPanelComponent
}];
