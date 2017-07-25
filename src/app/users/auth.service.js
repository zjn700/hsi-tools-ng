"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var rxjs_1 = require('rxjs');
//var electron: any;
//const {ipcRenderer, clipboard} = electron;
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.logoutNow = new core_1.EventEmitter();
        //public active_user:User;
        this.showWarning = new core_1.EventEmitter();
    }
    AuthService.prototype.signup = function (user) {
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(user);
        return this.http.post('/users', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    AuthService.prototype.signin = function (user) {
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(user);
        // electron.ipcRenderer.send('asynchronous-message', 'answer');
        // //ipcRenderer.send('asynchronous-message', 'answer');
        // electron.clipboard.writeText('Electron is ready!!');
        return this.http.post('/users/signin', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    AuthService.prototype.getActiveUser = function () {
        return this.signedInUser;
    };
    AuthService.prototype.setUser = function (userId) {
        var _this = this;
        //const queryString = '/'+ sequence +'?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id
        this.http.get('/users/' + localStorage.getItem('userId'))
            .map(function (response) {
            //response.json()
            return response.json().obj;
        })
            .subscribe(function (response) {
            console.log('response');
            console.log(response);
            _this.signedInUser = response;
            console.log('this.signedInUser');
            console.log(_this.signedInUser);
        });
    };
    AuthService.prototype.isTokenExpired = function () {
        var payloadBytes = localStorage.getItem('token').split('.')[1];
        //console.log(JSON.parse(atob(payloadBytes)).exp)
        var t_date = new Date().valueOf() / 1000;
        var exp_date = JSON.parse(atob(payloadBytes)).exp;
        if (exp_date - 35 < t_date) {
            this.router.navigate(['/logout']);
            setTimeout(this.showWarning.emit(true), 5000);
            return true;
        }
        // console.log(exp_date -10 < t_date)
        // console.log(exp_date -1  > t_date)
        return false;
    };
    AuthService.prototype.forceLogout = function () {
        console.log('forceLogout');
        this.logout();
        this.router.navigate(['/signin']);
    };
    AuthService.prototype.logout = function () {
        console.log('logout');
        localStorage.clear();
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('token') !== null;
    };
    __decorate([
        core_1.Output()
    ], AuthService.prototype, "showWarning");
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
