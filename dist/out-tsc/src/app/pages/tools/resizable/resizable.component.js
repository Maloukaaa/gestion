import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let ResizableComponent = class ResizableComponent {
    constructor() {
        this.style = {};
    }
    ngOnInit() {
    }
    validate(event) {
        const MIN_DIMENSIONS_PX = 50;
        if (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX) {
            return false;
        }
        return true;
    }
    onResizeEnd(event) {
        this.style = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top}px`,
            width: `${event.rectangle.width}px`,
            height: `${event.rectangle.height}px`
        };
    }
};
ResizableComponent = tslib_1.__decorate([
    Component({
        selector: 'app-resizable',
        templateUrl: './resizable.component.html',
        styleUrls: ['./resizable.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ResizableComponent);
export { ResizableComponent };
//# sourceMappingURL=resizable.component.js.map