import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [AdminPanelComponent, AdminLoginComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AdminLoginComponent,
    AdminPanelComponent
  ]
})
export class AdminModule { }
