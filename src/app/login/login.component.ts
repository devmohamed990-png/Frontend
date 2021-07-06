import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../Entity/LoginDTO';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errMsg: string = "";
  public loginDTO: LoginDTO = new LoginDTO();

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
    if (this.userService.isLogin) {
      this.route.navigate(['dashboard']);
    }
  }

  login() {
    this.userService.login(this.loginDTO).subscribe(
      data => {
        this.userService.email = this.loginDTO.email;
        this.userService.isLogin = true;
        this.route.navigate(['dashboard']);
      },
      err => {
        this.errMsg = err.error;
      }
    );
  }
}