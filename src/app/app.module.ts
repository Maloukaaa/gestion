import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../app/interceptors/auth.service';
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
import {DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxListModule,DxDropDownBoxModule,DxTreeViewModule,DxTagBoxModule, DxTemplateModule, DxDropDownButtonModule,
    DxToolbarModule,DxButtonModule ,DxBulletModule} from 'devextreme-angular';
import { ContactComponent } from './pages/contact/contact.component';
import { DxPopupModule } from "devextreme-angular";
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ContactFournisseurComponent } from './pages/contact-fournisseur/contact-fournisseur.component';
import { ContactClientComponent } from './pages/contact-client/contact-client.component';
import { ContactPartenaireComponent } from './pages/contact-partenaire/contact-partenaire.component';
import { AjoutContactComponent } from './pages/ajout-contact/ajout-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import {  ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {AuthGuardService} from "../app/auth-guard.service";
import { TestComponent } from './pages/test/test.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { FusionContactComponent } from './fusion-contact/fusion-contact.component'
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdministrationComponent } from './administration/administration.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { AddKeywordComponent } from './add-keyword/add-keyword.component';
import { EditKeywordComponent } from './edit-keyword/edit-keyword.component';
import { ShowKeywordComponent } from './show-keyword/show-keyword.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ImportationErreurComponent } from './importation-erreur/importation-erreur.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AdministrationKeywordComponent } from './administration-keyword/administration-keyword.component';
import { HomeComponent } from './pages/home/home.component';
import {MatSliderModule} from '@angular/material';

import {MatTabsModule} from '@angular/material';
const notifierDefaultOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "right",
          distance: 20
      },
      vertical: {
          position: "top",
          distance: (window.innerHeight/2)-70,
          gap: 10
      }
  },
  theme: "material",
  behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          //preset: "",
          speed: 300,
          easing: "ease"
      },
      hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50
      },
      shift: {
          speed: 300,
          easing: "ease"
      },
      overlap: 150
  }
};

@NgModule({  
  imports: [
      MatTabsModule,
      MatSliderModule,
    BrowserModule,
    DropDownListModule ,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatExpansionModule,
    NgbModule,
    ComboBoxModule,
    HttpClientModule,
    NgxSpinnerModule,
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
      BsDatepickerModule.forRoot(),
      NotifierModule.withConfig(notifierDefaultOptions),
      CollapseModule.forRoot()
   
   
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
    TestComponent,
    ImportModalComponent,
    FusionContactComponent,
    AdministrationComponent,
    KeywordsComponent,
    AddKeywordComponent,
    EditKeywordComponent,
    ShowKeywordComponent,
    ImportationErreurComponent,
    AdministrationKeywordComponent,
    HomeComponent,
    
  ],
  providers: [ 
    AppSettings, AuthGuardService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
   
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}