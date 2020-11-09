import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { MessagesService } from './messages.service';
let MessagesComponent = class MessagesComponent {
    constructor(messagesService) {
        this.messagesService = messagesService;
        this.messages = messagesService.getMessages();
        this.files = messagesService.getFiles();
        this.meetings = messagesService.getMeetings();
    }
    ngOnInit() {
        jQuery('#messagesTabs').on('click', '.nav-item a', function () {
            setTimeout(() => jQuery(this).closest('.dropdown').addClass('show'));
        });
    }
};
MessagesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-messages',
        templateUrl: './messages.component.html',
        styleUrls: ['./messages.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MessagesService]
    }),
    tslib_1.__metadata("design:paramtypes", [MessagesService])
], MessagesComponent);
export { MessagesComponent };
//# sourceMappingURL=messages.component.js.map