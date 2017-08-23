import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'hsi-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./user.css']
    
}) 
export class LogoutComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    
    ngOnInit(){
        this.authService.logoutNow
            .subscribe((logout: boolean) => {
                // console.log(logout)
                // console.log('logoutNow')
                this.onLogout()
            })
    }
    
    onLogout(){
        // console.log('onLogout')
        this.authService.logout();
        localStorage.clear();
        this.router.navigate(['/signin'])   //(['/auth', 'signin'])
    }
}