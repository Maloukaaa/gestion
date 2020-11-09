import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { AppCalendarComponent } from './app-calendar.component';
export const routes = [
    { path: '', component: AppCalendarComponent, pathMatch: 'full' }
];
let AppCalendarModule = class AppCalendarModule {
};
AppCalendarModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            CalendarModule,
            DirectivesModule,
            RouterModule.forChild(routes)
        ],
        declarations: [
            AppCalendarComponent
        ]
    })
], AppCalendarModule);
export { AppCalendarModule };
//# sourceMappingURL=app-calendar.module.js.map