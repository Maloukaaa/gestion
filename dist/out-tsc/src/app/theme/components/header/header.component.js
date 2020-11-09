import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { MenuService } from '../menu/menu.service';
let HeaderComponent = class HeaderComponent {
    constructor(appSettings, menuService) {
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.showHorizontalMenu = true;
        this.showInfoContent = false;
        this.myAppVersionNumberBack = "0";
        this.myAppVersionNumberFront = "Version: 0";
        this.settings = this.appSettings.settings;
        this.menuItems = this.menuService.getHorizontalMenuItems();
        // this.myAppVersionNumberFront=""
        this.myAppVersionNumberFront += "." + this.myAppVersionNumberBack;
        //  this.username=sessionStorage.getItem("username");
    }
    ngOnInit() {
        if (window.innerWidth <= 768)
            this.showHorizontalMenu = false;
    }
    useLanguage(language) {
        sessionStorage.setItem("locale", language);
        parent.document.location.reload();
    }
    closeSubMenus() {
        let menu = document.querySelector("#menu0");
        if (menu) {
            for (let i = 0; i < menu.children.length; i++) {
                let child = menu.children[i].children[1];
                if (child) {
                    if (child.classList.contains('show')) {
                        child.classList.remove('show');
                        menu.children[i].children[0].classList.add('collapsed');
                    }
                }
            }
        }
    }
    onWindowResize() {
        if (window.innerWidth <= 768) {
            this.showHorizontalMenu = false;
        }
        else {
            this.showHorizontalMenu = true;
        }
    }
};
tslib_1.__decorate([
    HostListener('window:resize'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HeaderComponent.prototype, "onWindowResize", null);
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService],
        animations: [
            trigger('showInfo', [
                state('1', style({ transform: 'rotate(180deg)' })),
                state('0', style({ transform: 'rotate(0deg)' })),
                transition('1 => 0', animate('400ms')),
                transition('0 => 1', animate('400ms'))
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings, MenuService])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map