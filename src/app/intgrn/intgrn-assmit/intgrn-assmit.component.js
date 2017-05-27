"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var IntgrnAssmitComponent = (function () {
    function IntgrnAssmitComponent() {
        this.hideMe = new core_1.EventEmitter();
        this.showCompleted = 'false';
    }
    IntgrnAssmitComponent.prototype.ngOnInit = function () {
    };
    IntgrnAssmitComponent.prototype.onClickPrev = function () {
        this.hideMe.emit(true);
    };
    __decorate([
        core_1.Input()
    ], IntgrnAssmitComponent.prototype, "showHeuristics");
    __decorate([
        core_1.Input()
    ], IntgrnAssmitComponent.prototype, "projectTitle");
    __decorate([
        core_1.Input()
    ], IntgrnAssmitComponent.prototype, "qnnTitle");
    __decorate([
        core_1.Output()
    ], IntgrnAssmitComponent.prototype, "hideMe");
    IntgrnAssmitComponent = __decorate([
        core_1.Component({
            selector: 'app-intgrn-assmit',
            templateUrl: './intgrn-assmit.component.html',
            styleUrls: ['./intgrn-assmit.component.css']
        })
    ], IntgrnAssmitComponent);
    return IntgrnAssmitComponent;
}());
exports.IntgrnAssmitComponent = IntgrnAssmitComponent;
this.showCompleted = false;
