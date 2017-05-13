"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var AnsrRationaleComponent = (function () {
    function AnsrRationaleComponent(cardService) {
        this.cardService = cardService;
    }
    AnsrRationaleComponent.prototype.ngOnInit = function () {
        this.myForm = new forms_1.FormGroup({
            comment: new forms_1.FormControl(null)
        });
    };
    AnsrRationaleComponent.prototype.getRationale = function () {
        return this.myForm.value.comment;
    };
    AnsrRationaleComponent.prototype.onClick = function () {
        this.cardService.emitTextInputSelected();
    };
    AnsrRationaleComponent.prototype.keyEvent = function (event) {
        this.cardService.emitTextInputSelected();
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event'])
    ], AnsrRationaleComponent.prototype, "keyEvent");
    AnsrRationaleComponent = __decorate([
        core_1.Component({
            selector: 'app-ansr-rationale',
            templateUrl: './ansr-rationale.component.html',
            styleUrls: ['./ansr-rationale.component.css']
        })
    ], AnsrRationaleComponent);
    return AnsrRationaleComponent;
}());
exports.AnsrRationaleComponent = AnsrRationaleComponent;
