import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AdminPanelComponent, LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    AdminPanelComponent
  ]
})
export class AdminModule { }
