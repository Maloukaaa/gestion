import * as tslib_1 from "tslib";
import { Component, VERSION, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const quotes = [
    {
        title: 'Title',
        message: 'Message'
    },
    {
        title: '😃',
        message: 'Supports Emoji'
    },
    {
        title: null,
        message: 'My name is Inigo Montoya. You killed my father. Prepare to die!',
    },
    {
        title: null,
        message: 'Titles are not always needed'
    },
    {
        title: 'Title only 👊',
        message: null,
    },
    {
        title: '',
        message: `Supports Angular ${VERSION.full}`,
    },
];
const types = ['success', 'error', 'info', 'warning'];
let ToasterComponent = class ToasterComponent {
    constructor(toastrService) {
        this.toastrService = toastrService;
        this.title = '';
        this.type = types[0];
        this.message = '';
        this.version = VERSION;
        this.lastInserted = [];
        this.options = this.toastrService.toastrConfig;
    }
    ngOnInit() {
        setTimeout(() => {
            this.toastrService.success('Welcome to toaster page!', 'Toastr fun!');
        });
    }
    openToast() {
        let m = this.message;
        let t = this.title;
        if (!this.title.length && !this.message.length) {
            const randomMessage = quotes[Math.floor(Math.random() * quotes.length)];
            m = randomMessage.message;
            t = randomMessage.title;
        }
        const opt = JSON.parse(JSON.stringify(this.options));
        const inserted = this.toastrService[this.type](m, t, opt);
        if (inserted) {
            this.lastInserted.push(inserted.toastId);
        }
        return inserted;
    }
    clearToasts() {
        this.toastrService.clear();
    }
    clearLastToast() {
        this.toastrService.clear(this.lastInserted.pop());
    }
};
ToasterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-toaster',
        templateUrl: './toaster.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService])
], ToasterComponent);
export { ToasterComponent };
//# sourceMappingURL=toaster.component.js.map