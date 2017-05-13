"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ansr_model_1 = require('./ansr/ansr.model');
var ansr_rationale_component_1 = require('./ansr/ansr-rationale/ansr-rationale.component');
var CardComponent = (function () {
    function CardComponent(cardService) {
        this.cardService = cardService;
        // for zac:  child/parent demo
        this.middleChildMessage = new core_1.EventEmitter();
        this.go = true;
        this.answers = [];
        this.hideRiskBox = true;
        this.hideRationale = true;
    }
    CardComponent.prototype.onMessageFromChild = function (message) {
        if (this.go) {
            this.childMessage = message;
            console.log(this.childMessage);
            this.middleChildMessage.emit(message);
            this.go = !this.go;
        }
        else {
            this.childMessage = '';
            this.middleChildMessage.emit('');
            this.go = !this.go;
        }
        console.log(this.go);
    };
    CardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cardService.answerSelected
            .subscribe(function (answer) {
            //console.log('card ' + answer)
            _this.answerSelected = answer;
            if (answer) {
                _this.hideRationale = !answer;
                _this.hideRiskBox = answer;
            }
            else {
                _this.hideRationale = answer;
                _this.hideRiskBox = answer;
            }
        });
        // this.cardService.setActiveAnswer
        //   .subscribe((num: number) => {
        //     this.setCurrentAnswer(num);
        //   })
        // this.cardService.getNewAnswers
        //   .subscribe(data => {
        //     console.log(data);
        //     this.getAnswers(data.domain, data.sequence);
        //     data = null;
        //   })
    };
    CardComponent.prototype.getAnswers = function (domain, currentAnswer) {
        var _this = this;
        // console.log('card component get answers');
        // console.log('domain')
        // console.log(domain)
        this.cardService.getAnswers(domain)
            .subscribe(function (data) {
            console.log(data);
            _this.answers = [];
            _this.answers = data;
            _this.answer = _this.answers[currentAnswer - 1];
            data = [];
            //console.log(this.answer)
        });
    };
    CardComponent.prototype.setCurrentAnswer = function (sequence) {
        this.answer = this.answers[sequence - 1];
        console.log(this.answer);
        ////this.cardService.getAnswer(domainId, sequence);
        // this.a_rationale = this.answers[sequence-1].rationale;
        // this.a_riskvalue = this.answers[sequence-1].riskValue
        // this.a_value = this.answers[sequence-1].value
    };
    // move this to save or run  before a new question is selected
    CardComponent.prototype.getAnswer = function (domainId, sequence) {
        this.cardService.getAnswer(domainId, sequence);
    };
    CardComponent.prototype.saveAnswer = function (domainId, sequence) {
        // getAnswer here then if answer is not returned add a new, else update the one returned
        var _this = this;
        if (!this.answer) {
            var dateCreated = new Date();
            var answer = new ansr_model_1.Answer(localStorage.getItem('pid'), domainId, sequence, this.answerSelected, null, this.ansrRationale.getRationale(), dateCreated, dateCreated);
            this.cardService.addAnswer(answer)
                .subscribe(function (answer) {
                console.log(answer);
                _this.answer = answer;
            });
        }
        else {
            this.answer.value = this.answerSelected;
            //this.answer.riskValue = this.riskBox.getRisk()
            this.answer.rationale = this.ansrRationale.getRationale();
            this.answer.dateModified = new Date();
            this.cardService.updateAnswer(this.answer);
        }
    };
    __decorate([
        core_1.Input()
    ], CardComponent.prototype, "ptitle");
    __decorate([
        core_1.Input()
    ], CardComponent.prototype, "q_content");
    __decorate([
        core_1.Input()
    ], CardComponent.prototype, "q_number");
    __decorate([
        core_1.ViewChild(ansr_rationale_component_1.AnsrRationaleComponent)
    ], CardComponent.prototype, "ansrRationale");
    __decorate([
        // not part of child/parent demo
        core_1.Output()
    ], CardComponent.prototype, "middleChildMessage");
    CardComponent = __decorate([
        core_1.Component({
            selector: 'app-card',
            templateUrl: './card.component.html',
            styleUrls: ['./card.component.css']
        })
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
