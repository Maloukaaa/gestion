import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ViewChild, HostListener, Input, ElementRef } from '@angular/core';
let BackTopComponent = class BackTopComponent {
    constructor() {
        this.position = 400;
        this.showSpeed = 500;
        this.moveSpeed = 700;
    }
    ngAfterViewInit() {
        this._onWindowScroll();
    }
    _onClick() {
        jQuery('html, body').animate({ scrollTop: 0 }, { duration: this.moveSpeed });
        return false;
    }
    _onWindowScroll() {
        let el = this._selector.nativeElement;
        window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], BackTopComponent.prototype, "position", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], BackTopComponent.prototype, "showSpeed", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], BackTopComponent.prototype, "moveSpeed", void 0);
tslib_1.__decorate([
    ViewChild('backTop', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], BackTopComponent.prototype, "_selector", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Boolean)
], BackTopComponent.prototype, "_onClick", null);
tslib_1.__decorate([
    HostListener('window:scroll'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BackTopComponent.prototype, "_onWindowScroll", null);
BackTopComponent = tslib_1.__decorate([
    Component({
        selector: 'app-back-top',
        encapsulation: ViewEncapsulation.None,
        styleUrls: ['./back-top.component.scss'],
        template: `
    <i #backTop class="fa fa-angle-up back-to-top transition" title="Back to Top"></i>
  `
    })
], BackTopComponent);
export { BackTopComponent };
//# sourceMappingURL=back-top.component.js.map