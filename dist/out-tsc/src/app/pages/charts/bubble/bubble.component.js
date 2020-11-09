import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { bubble } from './../charts.data';
let BubbleComponent = class BubbleComponent {
    constructor() {
        this.legendTitle = 'Legend';
        this.showLegend = true;
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.roundDomains = false;
        this.maxRadius = 10;
        this.minRadius = 3;
        this.schemeType = 'ordinal';
        this.showXAxis = true;
        this.showYAxis = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Census Date';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Life expectancy [years]';
        this.colorScheme = {
            domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
        };
        this.autoScale = true;
        Object.assign(this, { bubble });
    }
    onSelect(event) {
        console.log(event);
    }
};
BubbleComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bubble',
        templateUrl: './bubble.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], BubbleComponent);
export { BubbleComponent };
//# sourceMappingURL=bubble.component.js.map