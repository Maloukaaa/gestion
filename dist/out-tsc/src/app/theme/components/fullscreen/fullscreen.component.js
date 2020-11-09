import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ViewChild, HostListener, ElementRef } from '@angular/core';
let FullScreenComponent = class FullScreenComponent {
    constructor() {
        this.toggle = false;
    }
    requestFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        else {
            console.log('Fullscreen API is not supported.');
        }
    }
    ;
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else {
            console.log('Fullscreen API is not supported.');
        }
    }
    ;
    getFullscreen() {
        if (this.expand) {
            this.requestFullscreen(document.documentElement);
        }
        if (this.compress) {
            this.exitFullscreen();
        }
    }
    onFullScreenChange() {
        let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement ||
            document.webkitFullscreenElement || document.msFullscreenElement;
        if (fullscreenElement != null) {
            this.toggle = true;
        }
        else {
            this.toggle = false;
        }
    }
};
tslib_1.__decorate([
    ViewChild('expand', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FullScreenComponent.prototype, "expand", void 0);
tslib_1.__decorate([
    ViewChild('compress', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FullScreenComponent.prototype, "compress", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FullScreenComponent.prototype, "getFullscreen", null);
tslib_1.__decorate([
    HostListener('window:resize'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FullScreenComponent.prototype, "onFullScreenChange", null);
FullScreenComponent = tslib_1.__decorate([
    Component({
        selector: 'app-fullscreen',
        encapsulation: ViewEncapsulation.None,
        template: `
    <span class="pl-2 pr-2">
        <i *ngIf="!toggle" #expand class="fa fa-expand transition"></i>
        <i *ngIf="toggle" #compress class="fa fa-compress transition"></i>
    </span>
  `
    })
], FullScreenComponent);
export { FullScreenComponent };
//# sourceMappingURL=fullscreen.component.js.map