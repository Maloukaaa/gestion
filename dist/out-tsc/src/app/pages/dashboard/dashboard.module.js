import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { DashboardComponent } from './dashboard.component';
import { InfoPanelsComponent } from './info-panels/info-panels.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CostComponent } from './cost/cost.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
export const routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' }
];
let DashboardModule = class DashboardModule {
};
DashboardModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FormsModule,
            PerfectScrollbarModule,
            NgxChartsModule,
            DirectivesModule
        ],
        declarations: [
            DashboardComponent,
            InfoPanelsComponent,
            VisitorsComponent,
            CostComponent,
            InfoCardsComponent,
            DiskSpaceComponent,
            TodoComponent
        ]
    })
], DashboardModule);
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map