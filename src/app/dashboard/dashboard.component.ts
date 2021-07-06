import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { InfoResponseDTO } from '../Entity/InfoResponseDTO';

import * as SockJS from "sockjs-client";
import * as stomp from 'stompjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public infoResponseDTO: InfoResponseDTO = new InfoResponseDTO();
  private stompClient: any;

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
    if (!this.userService.isLogin) {
      this.userService.logout(this.userService.email).subscribe();
      this.userService.email = "";
      this.userService.isLogin = false;
      this.route.navigate(['login']);
    } else {
      this.userService.getInfo().subscribe(
        (res: any) => {
          this.infoResponseDTO = res;
        },
        err => {
          this.userService.email = "";
          this.userService.isLogin = false;
          this.route.navigate(['login']);
        }
      );

      this.openSocketForPage();
    }
  }
  

  disconnectSocket() {
    this.stompClient.disconnect();
  }

  openSocketForPage() {

    let webSocket = new SockJS(environment.backend_url + '/webSocket');
    let stompClient = stomp.over(webSocket);
    stompClient.connect({}, (frame: any) => {
      stompClient.subscribe(
        '/topic/user/data',
        (data: any) => {
          let body = JSON.parse(data.body);
          this.infoResponseDTO = body.info;
        },
        (err: any) => {
          console.log('Websocket Error >>>>>>>>>>>>>>>>>>> ', err);
        }
      );
    });
  }
}