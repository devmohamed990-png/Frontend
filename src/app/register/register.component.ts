import { Component, OnInit } from '@angular/core';
import { RegistrationDTO } from '../Entity/RegistrationDTO';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errMsg: string = "";
  public registrationDTO: RegistrationDTO = new RegistrationDTO();

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
  }

  register() {

    this.userService.register(this.registrationDTO).subscribe(
      res => {
        this.errMsg = "";
        this.route.navigate(['/login']);
      },
      err => {
        this.errMsg = err.error;
      }
    );
  }
}