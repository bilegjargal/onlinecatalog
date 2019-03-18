import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

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
        this.router.navigate(["/adminpanel"]);
      } else {
        console.log("username or password wrong");
      }
    });

  }
}
