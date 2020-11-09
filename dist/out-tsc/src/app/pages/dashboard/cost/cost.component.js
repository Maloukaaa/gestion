import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { cost } from '../dashboard.data';
function getNewTime(d) {
    let h = (d.getHours() < 10 ? '0' : '') + d.getHours(), m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(), s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds(), time = h + ":" + m + ":" + s;
    return time;
}
let CostComponent = class CostComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = true;
        this.tooltipDisabled = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Time';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Cost';
        this.colorScheme = {
            domain: ['#0096A6', '#D22E2E']
        };
        this.autoScale = true;
        this.settings = this.appSettings.settings;
        this.initPreviousSettings();
        setInterval(() => {
            this.cost = [...this.addRandomValue()];
        }, 3000);
    }
    ngOnInit() {
        this.cost = cost;
    }
    onSelect(event) {
        console.log(event);
    }
    addRandomValue() {
        let value1 = Math.random() * 1000000;
        this.cost[0].series.push({ "name": getNewTime(new Date()), "value": value1 });
        let value2 = Math.random() * 1000000;
        this.cost[1].series.push({ "name": getNewTime(new Date()), "value": value2 });
        if (this.cost[0].series.length > 5)
            this.cost[0].series.splice(0, 1);
        if (this.cost[1].series.length > 5)
            this.cost[1].series.splice(0, 1);
        return this.cost;
    }
    ngOnDestroy() {
        this.cost[0].series.length = 0;
    }
    ngDoCheck() {
        if (this.checkAppSettingsChanges()) {
            setTimeout(() => this.cost = [...cost]);
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
CostComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cost',
        templateUrl: './cost.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings])
], CostComponent);
export { CostComponent };
//# sourceMappingURL=cost.component.js.map