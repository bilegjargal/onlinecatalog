import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormsModule } from "@angular/forms";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  loginForm: FormGroup;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    const form = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    this.http.post('http://localhost:8080/login', form).subscribe((data: any) => {
      localStorage.clear();
      console.log(data);
      if (data.success == true) {
        localStorage.setItem("token", data.token);
        this.router.navigate(["/admin/panel"]);
      } else {
        console.log("username or password wrong");
      }
    });

  }
}
