import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'hsi-auth', 
    templateUrl: './auth.component.html'
    
})
export class AuthComponent {
    
    constructor(private authService: AuthService) { }

    isLoggedIn() {
          //console.log('logged in')
          //onsole.log(this.authService.isLoggedIn())
          return this.authService.isLoggedIn();   
    }
    
}