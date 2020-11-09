import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { countries } from '../dashboard.data';
let VisitorsComponent = class VisitorsComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.colorScheme = {
            domain: ['#378D3B', '#D22E2E', '#F47B00', '#AAAAAA']
        };
        this.gradient = true;
        this.tooltipDisabled = false;
        this.settings = this.appSettings.settings;
        this.initPreviousSettings();
    }
    visitorsLabelFormat(c) {
        switch (c.label) {
            case 'Germany':
                return `<span class="flag-icon flag-icon-de mr-2"></span>${c.label}`;
            case 'France':
                return `<span class="flag-icon flag-icon-fr mr-2"></span>${c.label}`;
            case 'Great Britain':
                return `<span class="flag-icon flag-icon-gb mr-2"></span>${c.label}`;
            default:
                return c.label;
        }
    }
    ngOnInit() {
        setTimeout(() => this.countries = countries);
        this.countries = countries;
    }
    onSelect(event) {
        console.log(event);
    }
    ngDoCheck() {
        if (this.checkAppSettingsChanges()) {
            setTimeout(() => this.countries = [...countries]);
            this.initPreviousSettings();
        }
    }
    checkAppSettingsChanges() {
        if (this.previousShowMenuOption != this.settings.theme.showMenu ||
            this.previousMenuOption != this.settings.theme.menu ||
            this.previousMenuTypeOption != this.settings.theme.menuType) {
            return true;
        }
        return false;
    }
    initPreviousSettings() {
        this.previousShowMenuOption = this.settings.theme.showMenu;
        this.previousMenuOption = this.settings.theme.menu;
        this.previousMenuTypeOption = this.settings.theme.menuType;
    }
};
VisitorsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-visitors',
        templateUrl: './visitors.component.html',
        styleUrls: ['./visitors.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings])
], VisitorsComponent);
export { VisitorsComponent };
//# sourceMappingURL=visitors.component.js.map