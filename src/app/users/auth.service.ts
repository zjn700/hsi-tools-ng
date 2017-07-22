import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
//var electron: any;
//const {ipcRenderer, clipboard} = electron;


@Injectable()
export class AuthService  {
    logoutNow = new EventEmitter<boolean>();
    //public active_user:User;
    @Output() showWarning = new EventEmitter<boolean>();
    //showWarning = new EventEmitter<boolean>();
    public signedInUser:User;

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

        // electron.ipcRenderer.send('asynchronous-message', 'answer');
        // //ipcRenderer.send('asynchronous-message', 'answer');
        // electron.clipboard.writeText('Electron is ready!!');


        return this.http.post('/users/signin', body, {headers: headers})
            .map((response : Response) => response.json())
            .catch((error: Response) => Observable.throw(error));
    }    
    
    getActiveUser() {
        return this.signedInUser;
    }
    
    setUser(userId) {
        //const queryString = '/'+ sequence +'?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id
        this.http.get('/users/' + localStorage.getItem('userId'))
            .map((response: Response) => {
                //response.json()
                return response.json().obj
                
            })
            .subscribe((response) => {
                console.log('response');
                console.log(response)
                this.signedInUser=response;
                console.log('this.signedInUser')
                console.log(this.signedInUser)
            })
    }
    
    isTokenExpired(){
        var payloadBytes = localStorage.getItem('token').split('.')[1];
        //console.log(JSON.parse(atob(payloadBytes)).exp)
        let t_date = new Date().valueOf()/1000 
        let exp_date = JSON.parse(atob(payloadBytes)).exp
        if ( exp_date - 35 < t_date) {
            this.router.navigate(['/logout'])
            setTimeout(this.showWarning.emit(true), 5000)
            return true
        }
        // console.log(exp_date -10 < t_date)
        // console.log(exp_date -1  > t_date)
        return false
        
    }
    
    forceLogout(){
        console.log('forceLogout')
        this.logout();
        this.router.navigate(['/signin']);
    }
    
    logout(){
        console.log('logout')
        localStorage.clear();

        
    }
    
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
