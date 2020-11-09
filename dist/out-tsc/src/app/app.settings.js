import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';
let AppSettings = class AppSettings {
    constructor() {
        this.settings = new Settings('Contact Manager', 'Angular Admin Template with Bootstrap 4', {
            menu: 'vertical',
            menuType: 'default',
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: false,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin: 'grey' //light , dark, blue, green, combined, purple, orange, brown, grey, pink          
        });
    }
};
AppSettings = tslib_1.__decorate([
    Injectable()
], AppSettings);
export { AppSettings };
//# sourceMappingURL=app.settings.js.map