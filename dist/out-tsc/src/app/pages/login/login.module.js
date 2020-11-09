import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export const routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' }
];
let LoginModule = class LoginModule {
};
LoginModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
            RouterModule.forChild(routes)
        ],
        declarations: [LoginComponent]
    })
], LoginModule);
export { LoginModule };
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
//# sourceMappingURL=login.module.js.map