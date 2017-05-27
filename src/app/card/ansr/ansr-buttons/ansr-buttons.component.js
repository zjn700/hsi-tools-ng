"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AnsrButtonsComponent = (function () {
    function AnsrButtonsComponent(cardService, elementRef) {
        this.cardService = cardService;
        this.elementRef = elementRef;
        this.a_value = null;
    }
    AnsrButtonsComponent.prototype.ngOnInit = function () {
        this.cardService.escapePressed
            .subscribe(function (data) {
            var menuItemList = document.getElementsByClassName("selected-btn");
            console.log('menuItemList')
            console.log(menuItemList)
            if (menuItemList.length>0) {
                var noButton = menuItemList[0];
                noButton.focus();
            }
        });
    };
    AnsrButtonsComponent.prototype.testStatus = function () {
        if (!a_details) {
            testStatus();
            return;
        }
        console.log(a_details);
    };
    AnsrButtonsComponent.prototype.emitAnswerSelected = function (value) {
        if (this.a_value != value) {
            this.cardService.emitAnswerSelected(value);
            this.a_details.value = value;
            this.cardService.emitUpdateThisAnswer(this.a_details);
        }
    };
    __decorate([
        core_1.Input()
    ], AnsrButtonsComponent.prototype, "a_value");
    __decorate([
        core_1.Input()
    ], AnsrButtonsComponent.prototype, "a_details");
    AnsrButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-ansr-buttons',
            templateUrl: './ansr-buttons.component.html',
            styleUrls: ['./ansr-buttons.component.css']
        })
    ], AnsrButtonsComponent);
    return AnsrButtonsComponent;
}());
exports.AnsrButtonsComponent = AnsrButtonsComponent;
