import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from './app.settings';
import { TranslateService } from '@ngx-translate/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { locale, loadMessages } from 'devextreme/localization';
import deMessages from 'devextreme/dist/js/localization/dx.messages.fr.js';
import { arLocale, frLocale, listLocales, defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('fr', frLocale);
defineLocale('ar', arLocale);
let AppComponent = class AppComponent {
    constructor(appSettings, router, translate, localeService) {
        this.appSettings = appSettings;
        this.router = router;
        this.translate = translate;
        this.localeService = localeService;
        this.locales = 'en';
        this.locales1 = listLocales();
        this.settings = this.appSettings.settings;
        loadMessages(deMessages);
        this.locale = sessionStorage.getItem("locale");
        if (this.locale != "" && this.locale != null && this.locale != undefined) {
            console.log(this.locale);
            locale(this.locale);
            translate.use(this.locale);
            this.localeService.use(this.locale);
        }
        else {
            locale("fr");
            // translate.use("fr");
            this.localeService.use("fr");
        }
    }
    useLanguage(language) {
        sessionStorage.setItem("locale", language);
        parent.document.location.reload();
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings, Router, TranslateService, BsLocaleService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map