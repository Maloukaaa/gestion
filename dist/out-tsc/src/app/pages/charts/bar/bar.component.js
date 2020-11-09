import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { single, multi } from './../charts.data';
let BarComponent = class BarComponent {
    constructor() {
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Population';
        this.colorScheme = {
            domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
        };
        Object.assign(this, { single, multi });
    }
    onSelect(event) {
        console.log(event);
    }
};
BarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bar',
        templateUrl: './bar.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], BarComponent);
export { BarComponent };
//# sourceMappingURL=bar.component.js.map