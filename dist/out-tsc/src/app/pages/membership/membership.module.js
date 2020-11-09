import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MembershipComponent } from './membership.component';
import { MembershipData } from './membership.data';
export const routes = [
    { path: '', component: MembershipComponent, pathMatch: 'full' }
];
let MembershipModule = class MembershipModule {
};
MembershipModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule,
            InMemoryWebApiModule.forRoot(MembershipData, { delay: 0 }),
            RouterModule.forChild(routes),
            FormsModule,
            ReactiveFormsModule,
            NgbModule,
            MultiselectDropdownModule,
            NgxPaginationModule,
            PipesModule
        ],
        declarations: [
            MembershipComponent
        ]
    })
], MembershipModule);
export { MembershipModule };
//# sourceMappingURL=membership.module.js.map