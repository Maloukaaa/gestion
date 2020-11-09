import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { SmartComponent } from './smart/smart.component';
import { NgxComponent } from './ngx/ngx.component';
export const routes = [
    { path: '', redirectTo: 'smart', pathMatch: 'full' },
    { path: 'smart', component: SmartComponent, data: { breadcrumb: 'Smart DataTable' } },
    { path: 'ngx', component: NgxComponent, data: { breadcrumb: 'NGX DataTable' } }
];
let DynamicTablesModule = class DynamicTablesModule {
};
DynamicTablesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule,
            Ng2SmartTableModule,
            NgxDatatableModule,
            DirectivesModule,
            RouterModule.forChild(routes)
        ],
        declarations: [
            SmartComponent,
            NgxComponent
        ]
    })
], DynamicTablesModule);
export { DynamicTablesModule };
//# sourceMappingURL=dynamic-tables.module.js.map