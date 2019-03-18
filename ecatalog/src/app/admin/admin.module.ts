import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from "@angular/forms"
@NgModule({
  declarations: [AdminPanelComponent, LoginComponent, ProductComponent, CategoryComponent, NewsComponent, ContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminRoutes),
  ],
  exports: [
    LoginComponent,
    AdminPanelComponent
  ]
})
export class AdminModule { }
