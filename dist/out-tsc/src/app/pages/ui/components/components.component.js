import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let ComponentsComponent = class ComponentsComponent {
    constructor() { }
    ngOnInit() {
        jQuery('.tt').tooltip({
            sanitize: false,
            sanitizeFn: function (content) {
                return null;
            }
        });
        jQuery('.pp').popover({
            sanitize: false,
            sanitizeFn: function (content) {
                return null;
            }
        });
    }
};
ComponentsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-components',
        templateUrl: './components.component.html',
        styleUrls: ['./components.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ComponentsComponent);
export { ComponentsComponent };
//# sourceMappingURL=components.component.js.map