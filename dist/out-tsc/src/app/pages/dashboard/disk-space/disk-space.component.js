import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { disk_space } from '../dashboard.data';
let DiskSpaceComponent = class DiskSpaceComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.showLegend = false;
        this.gradient = true;
        this.colorScheme = {
            domain: ['#2F3E9E', '#D22E2E', '#378D3B']
        };
        this.showLabels = true;
        this.explodeSlices = true;
        this.doughnut = false;
        this.settings = this.appSettings.settings;
        this.initPreviousSettings();
    }
    ngOnInit() {
        this.data = disk_space;
    }
    onSelect(event) {
        console.log(event);
    }
    ngDoCheck() {
        if (this.checkAppSettingsChanges()) {
            setTimeout(() => this.data = [...disk_space]);
            this.initPreviousSettings();
        }
    }
    checkAppSettingsChanges() {
        if (this.previousShowMenuOption != this.settings.theme.showMenu ||
            this.previousMenuOption != this.settings.theme.menu ||
            this.previousMenuTypeOption != this.settings.theme.menuType) {
            return true;
        }
        return false;
    }
    initPreviousSettings() {
        this.previousShowMenuOption = this.settings.theme.showMenu;
        this.previousMenuOption = this.settings.theme.menu;
        this.previousMenuTypeOption = this.settings.theme.menuType;
    }
};
DiskSpaceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-disk-space',
        templateUrl: './disk-space.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings])
], DiskSpaceComponent);
export { DiskSpaceComponent };
//# sourceMappingURL=disk-space.component.js.map