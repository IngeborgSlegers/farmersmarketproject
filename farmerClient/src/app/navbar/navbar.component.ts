import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '../vendor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = localStorage.getItem("token");
  vendor: Vendor;

  constructor(private vendorService: VendorService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn
  }

  toLogin(): void {
    this.router.navigate(["/auth"]);
    console.log("routed to auth/login")
  }

  // getVendor(id: number): void {
  //   this.vendorService.getVendor(id).subscribe(vendor => {
  //     if (!vendor) {
  //       localStorage.clear();
  //       this.router.navigate(["/auth"]);
  //     } else {
  //       this.vendor = vendor
  //     }
  //   })
  // }

  logout(): void {
    localStorage.clear();
  }

}
