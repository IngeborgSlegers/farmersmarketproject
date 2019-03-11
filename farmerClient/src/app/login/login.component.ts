import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  validateLogin(email: string, password: string) {
    let e = email.toLowerCase().trim();
    console.log(e)
    let p = password.trim();
    console.log(p)
    if (e === "") {
      alert("Please enter email");
    } else if (p === "") {
      alert("Please enter password");
    } else { 
      this.login(e, p);
    }
  }

  login(email: string, password: string) {
    this.authService
      .login({ email, password } as Vendor)
      .subscribe(credentials => {
        localStorage.setItem("token", credentials.token);
        console.log("user is logged in")
      })
  }

  ngOnInit() {
  }

}
