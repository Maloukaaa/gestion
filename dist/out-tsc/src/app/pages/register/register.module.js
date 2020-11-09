import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
export const routes = [
    { path: '', component: RegisterComponent, pathMatch: 'full' }
];
let RegisterModule = class RegisterModule {
};
RegisterModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [
            RegisterComponent
        ]
    })
], RegisterModule);
export { RegisterModule };
//# sourceMappingURL=register.module.js.map