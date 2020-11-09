import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../menu/menu.service';
let FavoritesComponent = class FavoritesComponent {
    constructor(menuService) {
        this.menuService = menuService;
        this.favoriteModel = [];
        this.favoriteSettings = {
            enableSearch: true,
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-secondary btn-block',
            dynamicTitleMaxItems: 0,
            displayAllSelectedText: true
        };
        this.favoriteTexts = {
            checkAll: 'Select all',
            uncheckAll: 'Unselect all',
            checked: 'menu item selected',
            checkedPlural: 'menu items selected',
            searchPlaceholder: 'Find menu item...',
            defaultTitle: 'Select favorite menu items',
            allSelected: 'All selected',
        };
        this.favoriteOptions = [];
        this.favorites = [];
        this.menuItems = this.menuService.getVerticalMenuItems().filter(menu => menu.routerLink != null || menu.href != null);
        this.menuItems.forEach(item => {
            let menu = {
                id: item.id,
                name: item.title,
                routerLink: item.routerLink,
                href: item.href,
                icon: item.icon,
                target: item.target
            };
            this.favoriteOptions.push(menu);
        });
        if (sessionStorage["favorites"]) {
            this.favorites = JSON.parse(sessionStorage.getItem("favorites"));
            this.favorites.forEach(favorite => {
                this.favoriteModel.push(favorite.id);
            });
        }
    }
    onDropdownOpened() {
        this.toggle = true;
    }
    onDropdownClosed() {
        this.toggle = false;
    }
    onChange() {
        this.favorites.length = 0;
        this.favoriteModel.forEach(i => {
            let favorite = this.favoriteOptions.find(mail => mail.id === +i);
            this.favorites.push(favorite);
        });
        sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
};
FavoritesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-favorites',
        templateUrl: './favorites.component.html',
        styleUrls: ['./favorites.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [MenuService])
], FavoritesComponent);
export { FavoritesComponent };
//# sourceMappingURL=favorites.component.js.map