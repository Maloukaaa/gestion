import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu.service';
import { AppSettings } from '../../../../app.settings';
let VerticalMenuComponent = class VerticalMenuComponent {
    constructor(appSettings, menuService, router, elementRef) {
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.router = router;
        this.elementRef = elementRef;
        this.settings = this.appSettings.settings;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
                let activeLink = this.menuService.getActiveLink(this.menuItems);
                this.menuService.setActiveLink(this.menuItems, activeLink);
                jQuery('.tooltip').tooltip({
                    sanitize: false,
                    sanitizeFn: function (content) {
                        return null;
                    }
                });
                jQuery('.tooltip').tooltip('hide');
                if (window.innerWidth <= 768) {
                    this.settings.theme.showMenu = false;
                }
            }
        });
    }
    ngOnInit() {
        let menu_wrapper = this.elementRef.nativeElement.children[0];
        this.menuService.createMenu(this.menuItems, menu_wrapper, 'vertical');
        if (this.settings.theme.menuType == 'mini') {
            jQuery('.menu-item-link').tooltip({
                sanitize: false,
                sanitizeFn: function (content) {
                    return null;
                }
            });
            jQuery('.menu-item-link').tooltip();
        }
    }
    ngAfterViewInit() {
        //this.menuService.showActiveSubMenu(this.menuItems);
        let activeLink = this.menuService.getActiveLink(this.menuItems);
        this.menuService.setActiveLink(this.menuItems, activeLink);
    }
};
tslib_1.__decorate([
    Input('menuItems'),
    tslib_1.__metadata("design:type", Object)
], VerticalMenuComponent.prototype, "menuItems", void 0);
VerticalMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-vertical-menu',
        templateUrl: './vertical-menu.component.html',
        styleUrls: ['./vertical-menu.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings,
        MenuService,
        Router,
        ElementRef])
], VerticalMenuComponent);
export { VerticalMenuComponent };
//# sourceMappingURL=vertical-menu.component.js.map