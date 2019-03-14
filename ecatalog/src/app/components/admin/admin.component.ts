import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent {

  loginForm: FormGroup;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
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
