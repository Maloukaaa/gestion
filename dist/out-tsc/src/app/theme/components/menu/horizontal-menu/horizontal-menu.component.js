import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu.service';
import { AppSettings } from '../../../../app.settings';
let HorizontalMenuComponent = class HorizontalMenuComponent {
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
            }
        });
    }
    ngOnInit() {
        let menu_wrapper = this.elementRef.nativeElement.children[0];
        this.menuService.createMenu(this.menuItems, menu_wrapper, 'horizontal');
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
        let activeLink = this.menuService.getActiveLink(this.menuItems);
        this.menuService.setActiveLink(this.menuItems, activeLink);
    }
};
tslib_1.__decorate([
    Input('menuItems'),
    tslib_1.__metadata("design:type", Object)
], HorizontalMenuComponent.prototype, "menuItems", void 0);
HorizontalMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-horizontal-menu',
        templateUrl: './horizontal-menu.component.html',
        styleUrls: ['./horizontal-menu.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings,
        MenuService,
        Router,
        ElementRef])
], HorizontalMenuComponent);
export { HorizontalMenuComponent };
//# sourceMappingURL=horizontal-menu.component.js.map