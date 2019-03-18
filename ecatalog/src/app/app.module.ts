import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
