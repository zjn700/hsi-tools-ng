"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var QstnComponent = (function () {
    function QstnComponent() {
        this.clicked = false;
    }
    QstnComponent.prototype.ngOnInit = function () {
        // console.log('this.q_content')
        // console.log(this.q_content)
        // let elementList = document.getElementsByClassName("question"); 
        // this.glossaryHtml = elementList[0].innerHTML
        // console.log('glossaryHtml')
        // console.log(this.glossaryHtml)
        console.log(this.q_content);
        this.glossaryHtml =
        ;
    };
    QstnComponent.prototype.onClick = function () {
        this.clicked = !this.clicked;
        if (this.clicked) {
            var elementList_1 = document.getElementsByClassName("question");
            elementList_1[0].innerHTML = this.q_content;
        }
        var elementList = document.getElementsByClassName("question");
        console.log('elementList');
        console.log(elementList);
        console.log('clicked');
        console.log(this.clicked);
        //elementList[0].innerHTML = this.q_content
    };
    __decorate([
        core_1.Input()
    ], QstnComponent.prototype, "q_content");
    __decorate([
        core_1.Input()
    ], QstnComponent.prototype, "q_number");
    QstnComponent = __decorate([
        core_1.Component({
            selector: 'app-qstn',
            templateUrl: './qstn.component.html',
            styleUrls: ['./qstn.component.css']
        })
    ], QstnComponent);
    return QstnComponent;
}());
exports.QstnComponent = QstnComponent;
