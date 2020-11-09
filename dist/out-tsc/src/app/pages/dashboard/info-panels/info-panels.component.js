import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
let InfoPanelsComponent = class InfoPanelsComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.sales = [{ name: 'sales', value: 0.81, extra: { format: 'percent' } }];
        this.salesBgColor = { domain: ['#2F3E9E'] };
        this.likes = [{ name: 'likes', value: 47588 }];
        this.likesBgColor = { domain: ['#D22E2E'] };
        this.downloads = [{ name: 'downloads', value: 189730 }];
        this.downloadsBgColor = { domain: ['#378D3B'] };
        this.profit = [{ name: 'profit', value: 52470, extra: { format: 'currency' } }];
        this.profitBgColor = { domain: ['#0096A6'] };
        this.messages = [{ name: 'messages', value: 75296 }];
        this.messagesBgColor = { domain: ['#606060'] };
        this.members = [{ name: 'members', value: 216279 }];
        this.membersBgColor = { domain: ['#F47B00'] };
        this.settings = this.appSettings.settings;
        this.initPreviousSettings();
    }
    infoLabelFormat(c) {
        switch (c.data.name) {
            case 'sales':
                return `<i class="fa fa-shopping-cart mr-2"></i>${c.label}`;
            case 'likes':
                return `<i class="fa fa-thumbs-o-up mr-2"></i>${c.label}`;
            case 'downloads':
                return `<i class="fa fa-download mr-2"></i>${c.label}`;
            case 'profit':
                return `<i class="fa fa-money mr-2"></i>${c.label}`;
            case 'messages':
                return `<i class="fa fa-comment-o mr-2"></i>${c.label}`;
            case 'members':
                return `<i class="fa fa-user mr-2"></i>${c.label}`;
            default:
                return c.label;
        }
    }
    infoValueFormat(c) {
        switch (c.data.extra ? c.data.extra.format : '') {
            case 'currency':
                return `\$${Math.round(c.value).toLocaleString()}`;
            case 'percent':
                return `${Math.round(c.value * 100)}%`;
            default:
                return c.value.toLocaleString();
        }
    }
    onSelect(event) {
        console.log(event);
    }
    ngDoCheck() {
        if (this.checkAppSettingsChanges()) {
            setTimeout(() => this.sales = [...this.sales]);
            setTimeout(() => this.likes = [...this.likes]);
            setTimeout(() => this.downloads = [...this.downloads]);
            setTimeout(() => this.profit = [...this.profit]);
            setTimeout(() => this.messages = [...this.messages]);
            setTimeout(() => this.members = [...this.members]);
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
InfoPanelsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-info-panels',
        templateUrl: './info-panels.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings])
], InfoPanelsComponent);
export { InfoPanelsComponent };
//# sourceMappingURL=info-panels.component.js.map