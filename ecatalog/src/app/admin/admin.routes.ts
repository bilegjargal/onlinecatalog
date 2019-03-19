import { Routes } from "@angular/router"
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth-guard.service';
export const AdminRoutes: Routes = [
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'product',
        component: ProductComponent,
        children: []
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: []
      },
      {
        path: 'addnews',
        component: NewsComponent,
        children: []
      },
      {
        path: 'contact',
        component: ContactComponent,
        children: []
      }
    ]
  }
];