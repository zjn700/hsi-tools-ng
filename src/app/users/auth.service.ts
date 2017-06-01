import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService  {
    logoutNow = new EventEmitter<boolean>();
    @Output() showWarning = new EventEmitter<boolean>();
    //showWarning = new EventEmitter<boolean>();

    constructor(private http: Http, private router: Router) { }
    
    signup(user: User) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(user)

        return this.http.post('/users', body, {headers: headers})
            .map((response : Response) =>  response.json())
            .catch((error: Response) => Observable.throw(error));
    }    

    signin(user: User) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(user)

        return this.http.post('/users/signin', body, {headers: headers})
            .map((response : Response) =>  response.json())
            .catch((error: Response) => Observable.throw(error));
    }    
    
    checkToken(){
        var payloadBytes = localStorage.getItem('token').split('.')[1];
        console.log(JSON.parse(atob(payloadBytes)).exp)
        console.log( new Date().valueOf()/1000 )
        if ( JSON.parse(atob(payloadBytes)).exp < new Date().valueOf()/1000 ) {
            console.log('emit showwarning')
            //this.showWarning.emit(true)
            this.forceLogout();
            return true
            //setTimeout(()=>{this.showWarning.emit(false)}, 1500)    

            //setTimeout(this.showWarning.emit(false), 10000)
            //this.forceLogout();
        } else {
            //this.showWarning.emit(false)
            return false
        }
        // if .exp - 10 minutes < new date 
        // { // + 30000) {
        //   //console.log('yep');
        //   //this.authService.forceLogout();
        // }
        
    }
    
    forceLogout(){
        console.log('forceLogout')
        this.logout();
        this.router.navigate(['/signin'])

    }
    
    logout(){
        console.log('logout')
        localStorage.clear();

        
    }
    
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
