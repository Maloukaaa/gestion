import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicMenuComponent } from './dynamic-menu.component';
export const routes = [
    { path: '', component: DynamicMenuComponent, pathMatch: 'full' }
];
let DynamicMenuModule = class DynamicMenuModule {
};
DynamicMenuModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes),
            NgbModule
        ],
        declarations: [
            DynamicMenuComponent
        ]
    })
], DynamicMenuModule);
export { DynamicMenuModule };
//# sourceMappingURL=dynamic-menu.module.js.map