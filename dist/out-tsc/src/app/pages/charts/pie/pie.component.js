import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { single } from './../charts.data';
let PieComponent = class PieComponent {
    constructor() {
        this.showLegend = true;
        this.gradient = true;
        this.colorScheme = {
            domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
        };
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        Object.assign(this, { single });
    }
    onSelect(event) {
        console.log(event);
    }
};
PieComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pie',
        templateUrl: './pie.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], PieComponent);
export { PieComponent };
//# sourceMappingURL=pie.component.js.map