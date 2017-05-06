"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var key_code_enum_1 = require('./shared/key-code.enum');
(function (TOP_MENU) {
    TOP_MENU[TOP_MENU["AUTH"] = 0] = "AUTH";
    TOP_MENU[TOP_MENU["PROJECTS"] = 1] = "PROJECTS";
    TOP_MENU[TOP_MENU["TOOLS"] = 2] = "TOOLS";
    TOP_MENU[TOP_MENU["CART"] = 3] = "CART";
    TOP_MENU[TOP_MENU["PRAT"] = 4] = "PRAT";
    TOP_MENU[TOP_MENU["QUESTIONS"] = 5] = "QUESTIONS"; //'/questions'
})(exports.TOP_MENU || (exports.TOP_MENU = {}));
var TOP_MENU = exports.TOP_MENU;
var TopMenuDirective = (function () {
    function TopMenuDirective(router) {
        this.router = router;
    }
    TopMenuDirective.prototype.menuItemSelected = function (menuItem) {
        //this.cardService.emitMenuItemSelected()
        console.log('menuItemSelected');
        console.log(menuItem);
        console.log();
        var route;
        switch (menuItem) {
            case TOP_MENU.AUTH:
                route = '/logout';
                break;
            case TOP_MENU.PROJECTS:
                route = '/project';
                break;
            case TOP_MENU.TOOLS:
                route = '/tools';
                break;
            case TOP_MENU.CART:
                route = '/crt-qnns';
                break;
            case TOP_MENU.PRAT:
                route = '/at-qnns';
                break;
            case TOP_MENU.QUESTIONS:
                route = '/questions';
                break;
            default:
                route = '/logout';
        }
        this.router.navigate([route]);
    };
    TopMenuDirective.prototype.keyEvent = function (event) {
        console.log(event);
        var menuItems = document.getElementsByClassName("topMenuItem");
        var selectedMenuItem = null;
        var menuItem = 0;
        //console.log(menuItems)
        if (event.keyCode === key_code_enum_1.KEY_CODE.RIGHT_ARROW && event.shiftKey) {
            console.log('right');
            console.log(menuItems);
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].classList.contains('active')) {
                    menuItems[i].classList.remove('active');
                    if (i == menuItems.length - 1) {
                        menuItem = i;
                    }
                    else {
                        menuItem = i + 1;
                    }
                    break;
                }
                else {
                    //selectedMenuItem = menuItems[0]
                    menuItem = 1;
                }
            }
            // selectedMenuItem.classList.add('active');
            this.menuItemSelected(menuItem);
        }
        if (event.keyCode === key_code_enum_1.KEY_CODE.LEFT_ARROW && event.shiftKey) {
            for (var i = 0; i < menuItems.length; i++) {
                console.log('left');
                console.log(menuItems);
                if (menuItems[i].classList.contains('active')) {
                    menuItems[i].classList.remove('active');
                    if (i == 0) {
                        // selectedMenuItem = menuItems[i]
                        menuItem = i;
                    }
                    else {
                        //selectedMenuItem = menuItems[i-1]
                        menuItem = i - 1;
                    }
                    break;
                }
                else {
                    //selectedMenuItem = menuItems[0]
                    menuItem = 1;
                }
            }
            // selectedMenuItem.classList.add('active');
            this.menuItemSelected(0);
            this.menuItemSelected(menuItem);
        }
        // if (selectedMenuItem) {
        //   selectedMenuItem.classList.add('active');
        //   this.menuItemSelected()
        //   console.log(selectedMenuItem)
        // }
    };
    __decorate([
        core_1.HostListener('body:keydown', ['$event'])
    ], TopMenuDirective.prototype, "keyEvent");
    TopMenuDirective = __decorate([
        core_1.Directive({
            selector: '[appTopMenu]'
        })
    ], TopMenuDirective);
    return TopMenuDirective;
}());
exports.TopMenuDirective = TopMenuDirective;
