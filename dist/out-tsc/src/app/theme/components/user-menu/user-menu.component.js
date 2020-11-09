import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
let UserMenuComponent = class UserMenuComponent {
    constructor(router) {
        this.router = router;
        this.username = localStorage.getItem("username");
    }
    ngOnInit() {
    }
    logOut() {
        localStorage.clear();
        this.router.navigate([""]);
    }
};
UserMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-menu',
        templateUrl: './user-menu.component.html',
        styleUrls: ['./user-menu.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], UserMenuComponent);
export { UserMenuComponent };
//# sourceMappingURL=user-menu.component.js.map