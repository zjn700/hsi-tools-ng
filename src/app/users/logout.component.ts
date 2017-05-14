import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'hsi-logout',
    templateUrl: './logout.component.html'
}) 
export class LogoutComponent {
    constructor(private authService: AuthService, private router: Router) { }
    
    
    onLogout(){
        this.authService.logout();
        localStorage.clear();
        this.router.navigate(['/signin'])   //(['/auth', 'signin'])
    }
}