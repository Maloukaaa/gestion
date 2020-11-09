import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MailboxComponent } from './mailbox.component';
export const routes = [
    { path: '', component: MailboxComponent, pathMatch: 'full' }
];
let MailboxModule = class MailboxModule {
};
MailboxModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            RouterModule.forChild(routes),
            PerfectScrollbarModule,
            PipesModule
        ],
        declarations: [
            MailboxComponent
        ]
    })
], MailboxModule);
export { MailboxModule };
//# sourceMappingURL=mailbox.module.js.map