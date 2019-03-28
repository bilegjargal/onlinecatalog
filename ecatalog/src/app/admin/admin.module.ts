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
import { AuthGuard } from '../guards/auth-guard.service';
import { LogoutModal } from './modal/logout';
@NgModule({
  declarations: [AdminPanelComponent, LoginComponent, ProductComponent, CategoryComponent, NewsComponent, ContactComponent, LogoutModal],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminRoutes),
  ],
  exports: [
    LoginComponent,
    AdminPanelComponent
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
