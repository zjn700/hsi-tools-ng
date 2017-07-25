"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
require("rxjs/add/operator/takeWhile");
var user_model_1 = require('./user.model');
var SignupComponent = (function () {
    function SignupComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.alive = true;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.myForm = new forms_1.FormGroup({
            firstName: new forms_1.FormControl(null, forms_1.Validators.required),
            lastName: new forms_1.FormControl(null, forms_1.Validators.required),
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
            ]),
            password: new forms_1.FormControl(null, forms_1.Validators.required),
            office: new forms_1.FormControl(null)
        });
    };
    SignupComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.myForm);
        var user = new user_model_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName, this.myForm.value.office);
        this.authService.signup(user)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (data) {
            console.log(data);
            _this.router.navigate(['/signin']); //(['/auth', 'signin'])
        }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'hsi-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./user.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
