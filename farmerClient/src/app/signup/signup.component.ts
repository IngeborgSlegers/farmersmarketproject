import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  signup(vendorName: string, email: string, password: string) {
    this.authService
      .signup({ vendorName, email, password})
      .subscribe(data => {
        localStorage.setItem("token", data.sessionToken);
        console.log('token: ', data.sessionToken)
        console.log('user is registered!')
      })
  }

}

