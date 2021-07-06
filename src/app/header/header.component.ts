import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
  }

  logout() {

    this.userService.logout(this.userService.email).subscribe(
      res => {
        this.userService.email = "";
        this.userService.isLogin = false;
        this.route.navigate(['/login']);
      },
      err => {
        console.error('err', err);
        this.route.navigate(['/login']);
      }
    );
  }
}
