import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
let PagesComponent = class PagesComponent {
    constructor(appSettings, router) {
        this.appSettings = appSettings;
        this.router = router;
        this.showMenu = false;
        this.showSetting = false;
        this.menus = ['vertical', 'horizontal'];
        this.menuTypes = ['default', 'compact', 'mini'];
        this.settings = this.appSettings.settings;
        if (sessionStorage["skin"]) {
            this.settings.theme.skin = sessionStorage["skin"];
        }
    }
    ngOnInit() {
        if (window.innerWidth <= 768) {
            this.settings.theme.showMenu = false;
            this.settings.theme.sideChatIsHoverable = false;
        }
        this.showMenu = this.settings.theme.showMenu;
        this.menuOption = this.settings.theme.menu;
        this.menuTypeOption = this.settings.theme.menuType;
    }
    chooseMenu(menu) {
        this.settings.theme.menu = menu;
        this.router.navigate(['/']);
    }
    chooseMenuType(menuType) {
        this.settings.theme.menuType = menuType;
        jQuery('.menu-item-link').tooltip({
            sanitize: false,
            sanitizeFn: function (content) {
                return null;
            }
        });
        if (menuType == 'mini') {
            jQuery('.menu-item-link').tooltip('enable');
        }
        else {
            jQuery('.menu-item-link').tooltip('disable');
        }
    }
    changeTheme(theme) {
        this.settings.theme.skin = theme;
        sessionStorage["skin"] = theme;
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
    onWindowResize() {
        let showMenu = !this._showMenu();
        if (this.showMenu !== showMenu) {
            this.showMenuStateChange(showMenu);
        }
        this.showMenu = showMenu;
    }
    showMenuStateChange(showMenu) {
        this.settings.theme.showMenu = showMenu;
    }
    _showMenu() {
        return window.innerWidth <= 768;
    }
};
tslib_1.__decorate([
    HostListener('window:resize'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PagesComponent.prototype, "onWindowResize", null);
PagesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pages',
        templateUrl: './pages.component.html',
        styleUrls: ['./pages.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings, Router])
], PagesComponent);
export { PagesComponent };
//# sourceMappingURL=pages.component.js.map