import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationDTO } from '../Entity/RegistrationDTO';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../Entity/LoginDTO';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public isLogin: boolean = false;
  public email: string = "";

  register(data: RegistrationDTO) {

    return this.http.post(environment.backend_url + '/user/register', data, { responseType: 'text' });
  }

  login(data: LoginDTO) {

    return this.http.post(environment.backend_url + '/user/login', data, { responseType: 'text' });
  }

  getInfo() {

    return this.http.get(environment.backend_url + '/user/info');
  }

  logout(email: string) {

    return this.http.options(environment.backend_url + `/user/logout?email=` + email, { responseType: 'text' });
  }
}