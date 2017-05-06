"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CardService = (function () {
    function CardService() {
        this.questionSelected = new core_1.EventEmitter();
        this.textInputSelected = new core_1.EventEmitter();
        this.menuItemSelected = new core_1.EventEmitter();
    }
    CardService.prototype.getQuestion = function (question) {
        this.questionSelected.emit(question);
    };
    CardService.prototype.rationaleSelected = function () {
        this.textInputSelected.emit(true);
    };
    CardService.prototype.emitMenuItemSelected = function () {
        this.menuItemSelected.emit(true);
    };
    CardService = __decorate([
        core_1.Injectable()
    ], CardService);
    return CardService;
}());
exports.CardService = CardService;
