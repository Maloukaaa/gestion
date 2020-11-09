import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { IconsService } from './icons.service';
let IconsComponent = class IconsComponent {
    constructor(iconsService) {
        this.iconsService = iconsService;
        this.icons = iconsService.getIcons();
    }
    ngOnInit() {
    }
};
IconsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-icons',
        templateUrl: './icons.component.html',
        styleUrls: ['./icons.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [IconsService]
    }),
    tslib_1.__metadata("design:paramtypes", [IconsService])
], IconsComponent);
export { IconsComponent };
//# sourceMappingURL=icons.component.js.map