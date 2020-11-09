import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { orders, products, customers, refunds } from '../dashboard.data';
let InfoCardsComponent = class InfoCardsComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.colorScheme = {
            domain: ['#FFFFFF']
        };
        this.autoScale = true;
        this.settings = this.appSettings.settings;
        this.initPreviousSettings();
    }
    ngOnInit() {
        this.orders = orders;
        this.products = products;
        this.customers = customers;
        this.refunds = refunds;
        this.orders = this.addRandomValue('orders');
        this.customers = this.addRandomValue('customers');
    }
    onSelect(event) {
        console.log(event);
    }
    addRandomValue(param) {
        switch (param) {
            case 'orders':
                for (let i = 1; i < 30; i++) {
                    this.orders[0].series.push({ "name": 1980 + i, "value": Math.ceil(Math.random() * 1000000) });
                }
                return this.orders;
            case 'customers':
                for (let i = 1; i < 15; i++) {
                    this.customers[0].series.push({ "name": 2000 + i, "value": Math.ceil(Math.random() * 1000000) });
                }
                return this.customers;
            default:
                return this.orders;
        }
    }
    ngOnDestroy() {
        this.orders[0].series.length = 0;
        this.customers[0].series.length = 0;
    }
    ngDoCheck() {
        if (this.checkAppSettingsChanges()) {
            setTimeout(() => this.orders = [...orders]);
            setTimeout(() => this.products = [...products]);
            setTimeout(() => this.customers = [...customers]);
            setTimeout(() => this.refunds = [...refunds]);
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
InfoCardsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-info-cards',
        templateUrl: './info-cards.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings])
], InfoCardsComponent);
export { InfoCardsComponent };
//# sourceMappingURL=info-cards.component.js.map