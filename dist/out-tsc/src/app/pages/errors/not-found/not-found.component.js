import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
let NotFoundComponent = class NotFoundComponent {
    constructor(router) {
        this.router = router;
    }
    searchResult() {
        this.router.navigate(['/search']);
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
};
NotFoundComponent = tslib_1.__decorate([
    Component({
        selector: 'app-not-found',
        templateUrl: './not-found.component.html',
        styleUrls: ['./not-found.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], NotFoundComponent);
export { NotFoundComponent };
//# sourceMappingURL=not-found.component.js.map