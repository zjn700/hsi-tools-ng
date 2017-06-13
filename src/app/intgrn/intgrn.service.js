"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var intgrn_model_1 = require('./intgrn.model');
var IntegrationService = (function () {
    function IntegrationService() {
        // questionSelected = new EventEmitter<Question>();
        // textInputSelected = new EventEmitter<boolean>();
        this.integrations = [];
        this.updatedIntegrationList = new core_1.EventEmitter();
        this.updateActiveIntegration = new core_1.EventEmitter();
        this.editEvauationTitle = new core_1.EventEmitter();
    }
    IntegrationService.prototype.getIntegrations = function () {
        return this.integrations;
    };
    IntegrationService.prototype.addIntegration = function (domainList, title) {
        console.log('in addIntegration');
        console.log(domainList);
        var t_domainList = [];
        for (var _i = 0, domainList_1 = domainList; _i < domainList_1.length; _i++) {
            var title_1 = domainList_1[_i];
            t_domainList.push(title_1);
        }
        var t_date = new Date();
        var t_integration = new intgrn_model_1.Integration(localStorage.getItem('pid'), localStorage.getItem('qnnId'), t_domainList, title, t_date, t_date, new Date(t_date).getTime().toString());
        this.integrations.push(t_integration);
        console.log(t_integration);
        this.setActiveIntegration(t_integration.id);
        this.updatedIntegrationList.emit(this.integrations);
    };
    IntegrationService.prototype.updateIntegration = function (index, domainList, title) {
        var t_domainList = [];
        for (var _i = 0, domainList_2 = domainList; _i < domainList_2.length; _i++) {
            var title_2 = domainList_2[_i];
            t_domainList.push(title_2);
        }
        this.integrations[index].domainList = t_domainList;
        this.integrations[index].title = title;
        this.integrations[index].dateModified = new Date();
        this.setActiveIntegration(this.integrations[index].id);
        console.log(this.integrations[index]);
    };
    IntegrationService.prototype.setActiveIntegration = function (integrationId) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == integrationId) {
                console.log(this.integrations[i]);
                this.updateActiveIntegration.emit(this.integrations[i]);
                return;
            }
        }
        //this.updateActiveIntegration.emit(integration)
    };
    IntegrationService.prototype.editThisEvaluationTitle = function (evaluationId) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == evaluationId) {
                console.log(this.integrations[i]);
                return this.editEvauationTitle.emit(this.integrations[i]);
            }
        }
    };
    IntegrationService.prototype.archiveThisEvaluation = function (evaluation) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == evaluation.id) {
                console.log(this.integrations[i]);
                this.integrations.splice(i, 1);
                return this.updatedIntegrationList.emit(this.integrations);
            }
        }
    };
    IntegrationService = __decorate([
        core_1.Injectable()
    ], IntegrationService);
    return IntegrationService;
}());
exports.IntegrationService = IntegrationService;
