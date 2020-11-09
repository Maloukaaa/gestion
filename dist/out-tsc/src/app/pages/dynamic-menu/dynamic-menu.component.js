import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from '../../app.settings';
import { Menu } from '../../theme/components/menu/menu.model';
import { MenuService } from '../../theme/components/menu/menu.service';
import { debounceTime } from 'rxjs/operators';
let DynamicMenuComponent = class DynamicMenuComponent {
    constructor(fb, toastrService, appSettings, menuService) {
        this.fb = fb;
        this.toastrService = toastrService;
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.targets = ['_blank', '_self'];
        this.icons = [
            { name: 'address-card-o', unicode: '&#xf2bc' },
            { name: 'bars', unicode: '&#xf0c9' },
            { name: 'bell-o', unicode: '&#xf0a2' },
            { name: 'calendar', unicode: '&#xf073' },
            { name: 'circle', unicode: '&#xf111' },
            { name: 'circle-o', unicode: '&#xf10c' },
            { name: 'cog', unicode: '&#xf013' },
            { name: 'comment', unicode: '&#xf075' },
            { name: 'comment-o', unicode: '&#xf0e5' },
            { name: 'credit-card', unicode: '&#xf09d' },
            { name: 'desktop', unicode: '&#xf108' },
            { name: 'exclamation-triangle', unicode: '&#xf071' },
            { name: 'folder', unicode: '&#xf07b' },
            { name: 'folder-o', unicode: '&#xf114' },
            { name: 'heart', unicode: '&#xf004' },
            { name: 'search', unicode: '&#xf002' }
        ];
        this.settings = this.appSettings.settings;
        if (this.settings.theme.menu == 'vertical') {
            this.menuItems = this.menuService.getVerticalMenuItems();
        }
        if (this.settings.theme.menu == 'horizontal') {
            this.menuItems = this.menuService.getHorizontalMenuItems();
        }
    }
    ngOnInit() {
        this.form = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            routerLink: null,
            href: null,
            icon: null,
            target: null,
            hasSubMenu: false,
            parentId: 0
        });
    }
    ngAfterViewInit() {
        this.form.valueChanges.pipe(debounceTime(500)).subscribe(menu => {
            if (menu.routerLink && menu.routerLink != '') {
                this.form.controls['href'].setValue(null);
                this.form.controls['href'].disable();
                this.form.controls['target'].setValue(null);
                this.form.controls['target'].disable();
            }
            else {
                this.form.controls['href'].enable();
                this.form.controls['target'].enable();
            }
            if (menu.href && menu.href != '') {
                this.form.controls['routerLink'].setValue(null);
                this.form.controls['routerLink'].disable();
                this.form.controls['hasSubMenu'].setValue(false);
                this.form.controls['hasSubMenu'].disable();
            }
            else {
                this.form.controls['routerLink'].enable();
                this.form.controls['hasSubMenu'].enable();
            }
        });
    }
    onSubmit(menu) {
        if (this.form.valid) {
            let lastId = this.menuItems[this.menuItems.length - 1].id;
            let newMenuItem = new Menu(lastId + 1, menu['title'], menu['routerLink'], menu['href'], menu['icon'], menu['target'], menu['hasSubMenu'], parseInt(menu['parentId']));
            this.menuService.addNewMenuItem(this.menuItems, newMenuItem, this.settings.theme.menu);
            this.toastrService.success('New menu item successfully added !', menu['title']);
            this.form.reset({
                hasSubMenu: false,
                parentId: 0
            });
        }
        jQuery('.menu-item-link').tooltip({
            sanitize: false,
            sanitizeFn: function (content) {
                return null;
            }
        });
        if (this.settings.theme.menuType == 'mini') {
            jQuery('.menu-item-link').tooltip('enable');
        }
        else {
            jQuery('.menu-item-link').tooltip('disable');
        }
    }
};
DynamicMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dynamic-menu',
        templateUrl: './dynamic-menu.component.html',
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ToastrService,
        AppSettings,
        MenuService])
], DynamicMenuComponent);
export { DynamicMenuComponent };
//# sourceMappingURL=dynamic-menu.component.js.map