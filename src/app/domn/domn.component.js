"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var key_code_enum_1 = require('../shared/key-code.enum');
var DomnComponent = (function () {
    function DomnComponent(domainService, cardService) {
        this.domainService = domainService;
        this.cardService = cardService;
        this.domains = [];
        this.questions = [];
        this.activeQuestionNumber = 1;
        this.activeDomainNumber = 1;
        this.isInitialized = false;
        this.atFirstQuestion = true;
        this.atLastQuestion = false;
        this.showMenu = false;
        this.inRationale = false;
        this.menuItemSelected = false;
    }
    DomnComponent.prototype.onMessageFromChild2 = function (message) {
        this.childMessage = message;
        console.log(this.childMessage);
    };
    //@HostListener('click', ['$event.target']) onClick(ev:Event) {
    DomnComponent.prototype.onClick = function (ev) {
        if (ev.srcElement.id == 'comment') {
            this.inRationale = true;
        }
        else {
            this.inRationale = false;
        }
    };
    // @HostListener('document:keypress', ['$event'])
    // && event.ctrlKey or altKey or shiftKey) 
    DomnComponent.prototype.keyEvent = function (event) {
        if (!this.inRationale && this.isInitialized) {
            if ((event.keyCode === key_code_enum_1.KEY_CODE.RIGHT_ARROW && event.ctrlKey) || event.keycode === key_code_enum_1.KEY_CODE.LESS_THAN) {
                this.getNextDomain();
                return;
            }
            if ((event.keyCode === key_code_enum_1.KEY_CODE.LEFT_ARROW && event.ctrlKey)) {
                this.getPrevDomain();
                return;
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.RIGHT_ARROW && !this.showMenu) {
                this.getNextQuestion();
                return;
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.LEFT_ARROW && !this.showMenu) {
                this.getPrevQuestion();
                return;
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.ENTER_KEY) {
                if (this.menuItemSelected) {
                    this.menuItemSelected = false;
                }
                else {
                    this.toggleMenu();
                }
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.SPACE_BAR) {
                if (!this.menuItemSelected) {
                    this.showMenu = true;
                }
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.DOWN_ARROW) {
                this.showMenu = true;
            }
            if (event.keyCode === key_code_enum_1.KEY_CODE.UP_ARROW) {
            }
        }
    };
    DomnComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectTitle = localStorage.getItem('ptitle');
        this.qnnTitle = localStorage.getItem('qnnTitle');
        this.domainService.getDomains()
            .subscribe(function (domains) {
            _this.domains = domains;
            _this.domain = domains[0];
            _this.questions = _this.domain.questions;
            _this.activeDomainNumber = _this.domain.sequence;
            _this.q_content = _this.domain.questions[0].content;
            _this.cleanUpFormat();
            _this.isInitialized = true;
        });
        this.cardService.questionSelected.subscribe(function (question) {
            _this.getThisQuestion(question);
        });
        this.cardService.menuItemSelected
            .subscribe(function (selected) {
            _this.menuItemSelected = selected;
        });
        this.cardService.textInputSelected
            .subscribe(function (selected) {
            _this.inRationale = selected;
        });
    };
    DomnComponent.prototype.getDomainQuestions = function (domain) {
        this.domain = domain;
        this.questions = this.domain.questions;
        this.activeQuestionNumber = this.domain.questions[0].sequence;
        this.activeDomainNumber = domain.sequence;
        this.q_content = this.domain.questions[0].content;
        this.cleanUpFormat();
    };
    DomnComponent.prototype.toggleMenu = function () {
        this.showMenu = !this.showMenu;
    };
    DomnComponent.prototype.getNextDomain = function () {
        if (this.domain.sequence < this.domains.length) {
            this.domain = this.domains[this.domain.sequence];
            this.questions = this.domain.questions;
            this.activeDomainNumber = this.domain.sequence;
            this.activeQuestionNumber = 1;
            this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
        }
        this.cleanUpFormat();
    };
    DomnComponent.prototype.getPrevDomain = function () {
        if (this.domain.sequence > 1) {
            this.domain = this.domains[this.domain.sequence - 2];
            this.questions = this.domain.questions;
            this.activeDomainNumber = this.domain.sequence;
            this.activeQuestionNumber = this.domain.questions.length;
            this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
        }
        this.cleanUpFormat();
    };
    DomnComponent.prototype.getNextQuestion = function () {
        if (this.activeQuestionNumber < this.domain.questions.length) {
            this.activeQuestionNumber += 1;
            this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
        }
        else {
            if (this.domain.sequence < this.domains.length) {
                this.domain = this.domains[this.domain.sequence];
                this.activeDomainNumber = this.domain.sequence;
                this.activeQuestionNumber = 1;
                this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
            }
        }
        this.cleanUpFormat();
    };
    DomnComponent.prototype.getPrevQuestion = function () {
        if (this.activeQuestionNumber > 1) {
            this.activeQuestionNumber -= 1;
            this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
        }
        else {
            if (this.domain.sequence > 1) {
                this.domain = this.domains[this.domain.sequence - 2];
                this.activeDomainNumber = this.domain.sequence;
                this.activeQuestionNumber = this.domain.questions.length;
                this.q_content = this.domain.questions[this.activeQuestionNumber - 1].content;
            }
        }
        this.cleanUpFormat();
    };
    DomnComponent.prototype.getThisQuestion = function (question) {
        this.activeQuestionNumber = question.sequence;
        this.q_content = question.content;
        this.cleanUpFormat();
        this.toggleMenu();
    };
    DomnComponent.prototype.cleanUpFormat = function () {
        this.q_number = this.formatQuestionNumber();
        this.checkEdges();
    };
    DomnComponent.prototype.formatQuestionNumber = function () {
        var q_number = this.activeDomainNumber.toString();
        if (this.activeQuestionNumber < 10) {
            q_number = q_number.concat('.0', this.activeQuestionNumber.toString());
        }
        else {
            q_number = q_number.concat('.', this.activeQuestionNumber.toString());
        }
        return q_number;
    };
    DomnComponent.prototype.checkEdges = function () {
        if (this.activeDomainNumber == 1 && this.activeQuestionNumber == 1) {
            this.atFirstQuestion = true;
        }
        else {
            this.atFirstQuestion = false;
        }
        if (this.activeDomainNumber == this.domains.length
            && this.activeQuestionNumber == this.domain.questions.length) {
            this.atLastQuestion = true;
        }
        else {
            this.atLastQuestion = false;
        }
    };
    __decorate([
        core_1.HostListener('click', ['$event'])
    ], DomnComponent.prototype, "onClick");
    __decorate([
        core_1.HostListener('window:keyup', ['$event'])
    ], DomnComponent.prototype, "keyEvent");
    DomnComponent = __decorate([
        core_1.Component({
            selector: 'app-domn',
            templateUrl: './domn.component.html',
            styleUrls: ['./domn.component.css']
        })
    ], DomnComponent);
    return DomnComponent;
}());
exports.DomnComponent = DomnComponent;
