import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
let NgxComponent = class NgxComponent {
    constructor() {
        this.editing = {};
        this.rows = [];
        this.temp = [];
        this.selected = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.fetch((data) => {
            this.temp = [...data];
            this.rows = data;
            setTimeout(() => { this.loadingIndicator = false; }, 1500);
        });
    }
    fetch(data) {
        const req = new XMLHttpRequest();
        req.open('GET', 'assets/data/company.json');
        req.onload = () => {
            data(JSON.parse(req.response));
        };
        req.send();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    updateValue(event, cell, cellValue, row) {
        this.editing[row.$$index + '-' + cell] = false;
        this.rows[row.$$index][cell] = event.target.value;
    }
    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    onActivate(event) {
        console.log('Activate Event', event);
    }
};
tslib_1.__decorate([
    ViewChild(DatatableComponent, { static: false }),
    tslib_1.__metadata("design:type", DatatableComponent)
], NgxComponent.prototype, "table", void 0);
NgxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ngx',
        templateUrl: './ngx.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], NgxComponent);
export { NgxComponent };
//# sourceMappingURL=ngx.component.js.map