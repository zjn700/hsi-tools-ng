"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require("rxjs/add/operator/takeWhile");
var IntgrnComponent = (function () {
    function IntgrnComponent(domnService, projectService, integrationService) {
        this.domnService = domnService;
        this.projectService = projectService;
        this.integrationService = integrationService;
        this.domainList = [];
        // state:
        this.showHeuristics = true;
        this.showForm = false;
        this.showErrorMessage = false;
        this.showDupeErrorMessage = false;
        this.pauseForDupe = false;
        this.isInEditMode = false;
        this.alive = true;
        // checkboxes:
        this.mp = false;
        this.sa = false;
        this.pe = false;
        this.oh = false;
        this.tr = false;
        this.su = false;
        this.hu = false;
        this.ha = false;
        this.en = false;
    }
    IntgrnComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    IntgrnComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectTitle = localStorage.getItem('ptitle');
        this.qnnTitle = localStorage.getItem('qnnTitle');
        this.integrationService.updateActiveIntegration
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (integration) {
            _this.evaluationTitle = integration.title;
            _this.activeEvaluation = integration;
            _this.showHeuristics = false;
            _this.showErrorMessage = false;
            _this.showDupeErrorMessage = false;
        });
        this.integrationService.editEvauationTitle
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (integration) {
            _this.evaluationTitle = integration.title;
            _this.activeEvaluation = integration;
            _this.onClear();
            for (var i = 0; i < integration.domainList.length; i++) {
                _this.domainList.push(integration.domainList[i]);
                _this.toggleByTitle(integration.domainList[i]);
            }
            _this.isInEditMode = true;
            _this.showForm = !_this.showForm;
            window.scrollTo(0, 0);
            //this.onAddHeuristic()
        });
    };
    IntgrnComponent.prototype.buildEvaluationTitle = function () {
        var t_title = '';
        for (var i = 0; i < this.domainList.length; i++) {
            t_title += this.domainList[i];
            if (i < this.domainList.length - 1) {
                t_title += ' vs ';
            }
        }
        return t_title;
    };
    IntgrnComponent.prototype.checkDomainListForDuplicates = function () {
        var total = 0;
        var t_integrations = this.integrationService.getIntegrations();
        for (var i = 0; i < t_integrations.length; i++) {
            for (var j = 0; j < t_integrations[i].domainList.length; j++) {
                for (var k = 0; k < this.domainList.length; k++) {
                    if (this.domainList[k] == t_integrations[i].domainList[j]) {
                        total++;
                    }
                }
            }
            if (total == this.domainList.length && total == t_integrations[i].domainList.length) {
                return i;
            }
            else {
                total = 0;
            }
        }
        return null;
    };
    IntgrnComponent.prototype.goToEvaluation = function () {
        if (this.domainList.length < 2) {
            this.showErrorMessage = true;
            this.showDupeErrorMessage = false;
        }
        else {
            if (this.isInEditMode) {
                var index = this.checkDomainListForDuplicates();
                if (index != null) {
                    this.isInEditMode = false;
                    this.showDupeErrorMessage = true;
                    this.pauseForDupe = !this.pauseForDupe;
                }
                else {
                    console.log('edit mode 0000000000000000000000');
                    this.evaluationTitle = this.buildEvaluationTitle();
                    this.activeEvaluation.title = this.evaluationTitle;
                    this.activeEvaluation.domainList.length = 0;
                    for (var i = 0; i < this.domainList.length; i++) {
                        this.activeEvaluation.domainList.push(this.domainList[i]);
                        this.toggleByTitle(this.domainList[i]);
                    }
                    this.isInEditMode = false;
                    this.showHeuristics = false;
                    this.showErrorMessage = false;
                    this.showDupeErrorMessage = false;
                }
            }
            else {
                var index = this.checkDomainListForDuplicates();
                if (index != null) {
                    this.pauseForDupe = !this.pauseForDupe;
                    if (this.pauseForDupe) {
                        this.showDupeErrorMessage = true;
                    }
                    else {
                        this.evaluationTitle = this.buildEvaluationTitle();
                        this.integrationService.updateIntegration(index, this.domainList, this.evaluationTitle);
                        this.showHeuristics = false;
                        this.showErrorMessage = false;
                        this.showDupeErrorMessage = false;
                    }
                }
                else {
                    this.evaluationTitle = this.buildEvaluationTitle();
                    this.integrationService.addIntegration(this.domainList, this.evaluationTitle);
                    this.showHeuristics = false;
                    this.showErrorMessage = false;
                    this.showDupeErrorMessage = false;
                }
            }
        }
    };
    IntgrnComponent.prototype.toggleByTitle = function (title) {
        switch (title) {
            case 'Manpower':
                this.mp = true;
                break;
            case 'Safety':
                this.sa = true;
                break;
            case 'Personnel':
                this.pe = true;
                break;
            case 'Occupational Health':
                this.oh = true;
                break;
            case 'Training':
                this.tr = true;
                break;
            case 'Survivability':
                this.su = true;
                break;
            case 'Human Factors':
                this.hu = true;
                break;
            case 'Habitability':
                this.ha = true;
                break;
            case 'Environment':
                this.en = true;
                break;
        }
    };
    IntgrnComponent.prototype.toggleMe = function (item) {
        switch (item.id) {
            case 'mp':
                this.mp = !this.mp;
                this.updateDomainList('Manpower');
                break;
            case 'sa':
                this.sa = !this.sa;
                this.updateDomainList('Safety');
                break;
            case 'pe':
                this.pe = !this.pe;
                this.updateDomainList('Personnel');
                break;
            case 'oh':
                this.oh = !this.oh;
                this.updateDomainList('Occupational Health');
                break;
            case 'tr':
                this.tr = !this.tr;
                this.updateDomainList('Training');
                break;
            case 'su':
                this.su = !this.su;
                this.updateDomainList('Survivability');
                break;
            case 'hu':
                this.hu = !this.hu;
                this.updateDomainList('Human Factors');
                break;
            case 'ha':
                this.ha = !this.ha;
                this.updateDomainList('Habitability');
                break;
            case 'en':
                this.en = !this.en;
                this.updateDomainList('Environment');
                break;
        }
    };
    IntgrnComponent.prototype.deleteEval = function () {
    };
    IntgrnComponent.prototype.updateDomainList = function (domainTitle) {
        var wasNotInList = true;
        for (var i = 0; i < this.domainList.length; i++) {
            if (this.domainList[i] == domainTitle) {
                this.domainList.splice(i, 1);
                wasNotInList = false;
                return;
            }
        }
        if (wasNotInList) {
            this.domainList.push(domainTitle);
        }
        if (this.domainList.length >= 2) {
            this.showErrorMessage = false;
        }
    };
    IntgrnComponent.prototype.toggleMPT = function () {
        this.onClear();
        this.mp = true;
        this.pe = true;
        this.tr = true;
        this.updateDomainList('Manpower');
        this.updateDomainList('Personnel');
        this.updateDomainList('Training');
    };
    IntgrnComponent.prototype.toggleESOH = function () {
        this.onClear();
        this.sa = true;
        this.oh = true;
        this.en = true;
        this.updateDomainList('Environment');
        this.updateDomainList('Safety');
        this.updateDomainList('Occupational Health');
    };
    IntgrnComponent.prototype.onClear = function () {
        this.domainList.length = 0;
        this.showErrorMessage = false;
        this.mp = false;
        this.sa = false;
        this.pe = false;
        this.oh = false;
        this.tr = false;
        this.su = false;
        this.hu = false;
        this.ha = false;
        this.en = false;
    };
    IntgrnComponent.prototype.onAddHeuristic = function () {
        this.showForm = !this.showForm;
        this.onClear();
        window.scrollTo(0, 0);
    };
    IntgrnComponent.prototype.onHideMe = function () {
        this.showHeuristics = true;
        this.showForm = false;
    };
    IntgrnComponent = __decorate([
        core_1.Component({
            selector: 'app-intgrn',
            templateUrl: './intgrn.component.html',
            styleUrls: ['./intgrn.component.css']
        })
    ], IntgrnComponent);
    return IntgrnComponent;
}());
exports.IntgrnComponent = IntgrnComponent;
