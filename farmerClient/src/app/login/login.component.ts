import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

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
      .subscribe(data => {
        localStorage.setItem("token", data.sessionToken);
        console.log("user is logged in");
        this.router.navigateByUrl('/account')
      })
  }

  ngOnInit() {
  }

}
