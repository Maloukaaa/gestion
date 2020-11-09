import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, } from "@angular/common/http";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxListModule, DxDropDownBoxModule, DxTreeViewModule, DxTagBoxModule, DxTemplateModule, DxDropDownButtonModule, DxToolbarModule, DxButtonModule, DxBulletModule } from 'devextreme-angular';
import { ContactComponent } from './pages/contact/contact.component';
import { DxPopupModule } from "devextreme-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactFournisseurComponent } from './pages/contact-fournisseur/contact-fournisseur.component';
import { ContactClientComponent } from './pages/contact-client/contact-client.component';
import { ContactPartenaireComponent } from './pages/contact-partenaire/contact-partenaire.component';
import { AjoutContactComponent } from './pages/ajout-contact/ajout-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthGuardService } from "../app/auth-guard.service";
import { TestComponent } from './pages/test/test.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            PerfectScrollbarModule,
            NgbModule,
            HttpClientModule,
            DxPopupModule,
            MultiselectDropdownModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
            }),
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            }),
            ToastrModule.forRoot(),
            PipesModule,
            routing,
            DxDataGridModule,
            DxSelectBoxModule,
            DxCheckBoxModule,
            DxListModule,
            DxDropDownBoxModule,
            DxTreeViewModule,
            DxTagBoxModule,
            DxTemplateModule,
            DxDropDownButtonModule,
            DxToolbarModule,
            DxButtonModule,
            DxBulletModule,
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
            BsDatepickerModule.forRoot()
        ],
        declarations: [
            AppComponent,
            PagesComponent,
            HeaderComponent,
            FooterComponent,
            SidebarComponent,
            VerticalMenuComponent,
            HorizontalMenuComponent,
            BreadcrumbComponent,
            BackTopComponent,
            FullScreenComponent,
            ApplicationsComponent,
            MessagesComponent,
            UserMenuComponent,
            FlagsMenuComponent,
            SideChatComponent,
            FavoritesComponent,
            BlankComponent,
            SearchComponent,
            NotFoundComponent,
            ContactComponent,
            ContactFournisseurComponent,
            ContactClientComponent,
            ContactPartenaireComponent,
            AjoutContactComponent,
            EditContactComponent,
            ShowContactComponent,
            TestComponent
        ],
        providers: [
            AppSettings, AuthGuardService,
            { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
//# sourceMappingURL=app.module.js.map