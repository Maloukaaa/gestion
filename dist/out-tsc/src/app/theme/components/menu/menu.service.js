import * as tslib_1 from "tslib";
import { Injectable, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { verticalMenuItems } from './menu';
import { horizontalMenuItems } from './menu';
import { TranslateService } from '@ngx-translate/core';
let MenuService = class MenuService {
    constructor(location, renderer2, router, translate) {
        this.location = location;
        this.renderer2 = renderer2;
        this.router = router;
        this.translate = translate;
    }
    getVerticalMenuItems() {
        return verticalMenuItems;
    }
    getHorizontalMenuItems() {
        return horizontalMenuItems;
    }
    createMenu(menu, nativeElement, type) {
        if (type == 'vertical') {
            this.createVerticalMenu(menu, nativeElement);
        }
        if (type == 'horizontal') {
            this.createHorizontalMenu(menu, nativeElement);
        }
    }
    createVerticalMenu(menu, nativeElement) {
        let menu0 = this.renderer2.createElement('div');
        this.renderer2.setAttribute(menu0, 'id', 'menu0');
        menu.forEach((menuItem) => {
            if (menuItem.parentId == 0) {
                let subMenu = this.createVerticalMenuItem(menu, menuItem);
                this.renderer2.appendChild(menu0, subMenu);
            }
        });
        this.renderer2.appendChild(nativeElement, menu0);
    }
    createHorizontalMenu(menu, nativeElement) {
        let nav = this.renderer2.createElement('div');
        this.renderer2.setAttribute(nav, 'id', 'navigation');
        let ul = this.renderer2.createElement('ul');
        this.renderer2.addClass(ul, 'menu');
        this.renderer2.appendChild(nav, ul);
        menu.forEach((menuItem) => {
            if (menuItem.parentId == 0) {
                let subMenu = this.createHorizontalMenuItem(menu, menuItem);
                this.renderer2.appendChild(ul, subMenu);
            }
        });
        this.renderer2.appendChild(nativeElement, nav);
    }
    createVerticalMenuItem(menu, menuItem) {
        let div = this.renderer2.createElement('div');
        this.renderer2.addClass(div, 'card');
        this.renderer2.setAttribute(div, 'id', 'menu' + menuItem.id);
        let link = this.renderer2.createElement('a');
        this.renderer2.addClass(link, 'menu-item-link');
        this.renderer2.setAttribute(link, 'data-toggle', 'tooltip');
        this.renderer2.setAttribute(link, 'data-placement', 'right');
        this.renderer2.setAttribute(link, 'data-animation', 'false');
        this.renderer2.setAttribute(link, 'data-container', '.vertical-menu-tooltip-place');
        this.renderer2.setAttribute(link, 'data-original-title', menuItem.title);
        this.renderer2.setAttribute(link, 'id', menuItem.title);
        let icon = this.renderer2.createElement('i');
        this.renderer2.addClass(icon, 'fa');
        this.renderer2.addClass(icon, 'fa-' + menuItem.icon);
        this.renderer2.appendChild(link, icon);
        let span = this.renderer2.createElement('span');
        this.renderer2.addClass(span, 'menu-title');
        this.renderer2.appendChild(link, span);
        let menuText;
        this.translate.instant("menuItem." + menuItem.id);
        this.translate.get("menuItem." + menuItem.id).subscribe((res) => {
            console.log(res);
            menuText = this.renderer2.createText(res);
            this.renderer2.appendChild(span, menuText);
            this.renderer2.setAttribute(span, 'translate', "menuItem.title");
            this.renderer2.setAttribute(link, 'id', 'link' + menuItem.id);
            this.renderer2.addClass(link, 'transition');
            this.renderer2.appendChild(div, link);
            if (menuItem.routerLink) {
                this.renderer2.listen(link, "click", () => {
                    this.router.navigate([menuItem.routerLink]);
                    this.setActiveLink(menu, link);
                });
            }
            if (menuItem.href) {
                this.renderer2.setAttribute(link, 'href', menuItem.href);
            }
            if (menuItem.target) {
                this.renderer2.setAttribute(link, 'target', menuItem.target);
            }
            if (menuItem.hasSubMenu) {
                this.renderer2.addClass(link, 'collapsed');
                let caret = this.renderer2.createElement('b');
                this.renderer2.addClass(caret, 'fa');
                this.renderer2.addClass(caret, 'fa-angle-up');
                this.renderer2.appendChild(link, caret);
                this.renderer2.setAttribute(link, 'data-toggle', 'collapse');
                this.renderer2.setAttribute(link, 'href', '#collapse' + menuItem.id);
                let collapse = this.renderer2.createElement('div');
                this.renderer2.setAttribute(collapse, 'id', 'collapse' + menuItem.id);
                this.renderer2.setAttribute(collapse, 'data-parent', '#menu' + menuItem.parentId);
                this.renderer2.addClass(collapse, 'collapse');
                this.renderer2.appendChild(div, collapse);
                this.createSubMenu(menu, menuItem.id, collapse, 'vertical');
            }
        });
        return div;
    }
    createHorizontalMenuItem(menu, menuItem) {
        let li = this.renderer2.createElement('li');
        this.renderer2.addClass(li, 'menu-item');
        let link = this.renderer2.createElement('a');
        this.renderer2.addClass(link, 'menu-item-link');
        this.renderer2.setAttribute(link, 'data-toggle', 'tooltip');
        this.renderer2.setAttribute(link, 'data-placement', 'top');
        this.renderer2.setAttribute(link, 'data-animation', 'false');
        this.renderer2.setAttribute(link, 'data-container', '.horizontal-menu-tooltip-place');
        // this.renderer2.setAttribute(link, 'data-original-title', menuItem.title);
        let icon = this.renderer2.createElement('i');
        this.renderer2.addClass(icon, 'fa');
        this.renderer2.addClass(icon, 'fa-' + menuItem.icon);
        this.renderer2.appendChild(link, icon);
        let span = this.renderer2.createElement('span');
        this.renderer2.addClass(span, 'menu-title');
        this.renderer2.appendChild(link, span);
        //let menuText = this.renderer2.createText(menuItem.title);
        // this.renderer2.appendChild(span, menuText);
        this.renderer2.appendChild(li, link);
        this.renderer2.setAttribute(span, '[translate]', "'demo.title'");
        this.renderer2.setAttribute(link, 'id', 'link' + menuItem.id);
        this.renderer2.addClass(link, 'transition');
        /* if(menuItem.routerLink){
           this.renderer2.listen(link, "click", () => {
               this.router.navigate([menuItem.routerLink]);
               this.setActiveLink(menu, link);
           });
         }*/
        if (menuItem.href) {
            this.renderer2.setAttribute(link, 'href', menuItem.href);
        }
        if (menuItem.target) {
            this.renderer2.setAttribute(link, 'target', menuItem.target);
        }
        if (menuItem.hasSubMenu) {
            this.renderer2.addClass(li, 'menu-item-has-children');
            let subMenu = this.renderer2.createElement('ul');
            this.renderer2.addClass(subMenu, 'sub-menu');
            this.renderer2.appendChild(li, subMenu);
            this.createSubMenu(menu, menuItem.id, subMenu, 'horizontal');
        }
        return li;
    }
    createSubMenu(menu, menuItemId, parentElement, type) {
        let menus = menu.filter(item => item.parentId === menuItemId);
        menus.forEach((menuItem) => {
            let subMenu = null;
            if (type == 'vertical') {
                subMenu = this.createVerticalMenuItem(menu, menuItem);
            }
            if (type == 'horizontal') {
                subMenu = this.createHorizontalMenuItem(menu, menuItem);
            }
            this.renderer2.appendChild(parentElement, subMenu);
        });
    }
    closeOtherSubMenus(elem) {
        let children = (this.renderer2.parentNode(elem)).children;
        for (let i = 0; i < children.length; i++) {
            let child = this.renderer2.nextSibling(children[i].children[0]);
            console.log(child);
            if (child) {
                console.log("inside");
                this.renderer2.removeClass(child, 'show');
                console.log(child);
                this.renderer2.addClass(child, 'collapse');
                // this.renderer2.addClass(children[i].children[0], 'collapsed');   
            }
        }
    }
    getActiveLink(menu) {
        let url = this.location.path();
        let routerLink = (url) ? url : '/'; // url.substring(1, url.length);
        let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            let activeLink = document.querySelector("#link" + activeMenuItem[0].id);
            return activeLink;
        }
        return false;
    }
    setActiveLink(menu, link) {
        if (link) {
            menu.forEach((menuItem) => {
                let activeLink = document.querySelector("#link" + menuItem.id);
                if (activeLink) {
                    if (activeLink.classList.contains('active-link')) {
                        activeLink.classList.remove('active-link');
                    }
                }
            });
            this.renderer2.addClass(link, 'active-link');
        }
    }
    showActiveSubMenu(menu) {
        let url = this.location.path();
        let routerLink = url; //url.substring(1, url.length);
        let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            let activeLink = document.querySelector("#link" + activeMenuItem[0].id);
            let parent = this.renderer2.parentNode(activeLink);
            while (this.renderer2.parentNode(parent)) {
                parent = this.renderer2.parentNode(parent);
                if (parent.className == 'collapse') {
                    let parentMenu = menu.filter(item => item.id === activeMenuItem[0].parentId);
                    let activeParentLink = document.querySelector("#link" + parentMenu[0].id);
                    this.renderer2.removeClass(activeParentLink, 'collapsed');
                    this.renderer2.addClass(parent, 'show');
                }
                if (parent.classList.contains('menu-wrapper')) {
                    break;
                }
            }
        }
    }
    addNewMenuItem(menu, newMenuItem, type) {
        menu.push(newMenuItem);
        if (newMenuItem.parentId != 0) {
            let parentMenu = menu.filter(item => item.id === newMenuItem.parentId);
            if (parentMenu.length) {
                if (!parentMenu[0].hasSubMenu) {
                    parentMenu[0].hasSubMenu = true;
                    // parentMenu[0].routerLink = null;
                }
            }
        }
        let menu_wrapper = null;
        if (type == 'vertical') {
            menu_wrapper = document.getElementById('vertical-menu');
        }
        if (type == 'horizontal') {
            menu_wrapper = document.getElementById('horizontal-menu');
        }
        while (menu_wrapper.firstChild) {
            menu_wrapper.removeChild(menu_wrapper.firstChild);
        }
        this.createMenu(menu, menu_wrapper, type);
    }
};
MenuService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Location,
        Renderer2,
        Router, TranslateService])
], MenuService);
export { MenuService };
//# sourceMappingURL=menu.service.js.map