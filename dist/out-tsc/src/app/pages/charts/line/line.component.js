import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { single, multi } from './../charts.data';
let LineComponent = class LineComponent {
    constructor() {
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Year';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Population';
        this.colorScheme = {
            domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
        };
        this.autoScale = true;
        Object.assign(this, { single, multi });
    }
    onSelect(event) {
        console.log(event);
    }
};
LineComponent = tslib_1.__decorate([
    Component({
        selector: 'app-line',
        templateUrl: './line.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], LineComponent);
export { LineComponent };
//# sourceMappingURL=line.component.js.map