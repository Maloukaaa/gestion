import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDirective } from './widget/widget.directive';
let DirectivesModule = class DirectivesModule {
};
DirectivesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            WidgetDirective
        ],
        exports: [
            WidgetDirective
        ]
    })
], DirectivesModule);
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map