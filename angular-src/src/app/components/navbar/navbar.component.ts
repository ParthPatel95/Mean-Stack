import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Object;
  
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
  });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('Logged Out', {
      cssClass:'alert-success',
      timeout: 2000
    });
    this.router.navigate(['login']);
    return false;
  }

}
