import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { SideChatService } from './side-chat.service';
import { SideChat } from './side-chat.model';
let SideChatComponent = class SideChatComponent {
    constructor(appSettings, sideChatService) {
        this.appSettings = appSettings;
        this.sideChatService = sideChatService;
        this.showHoverableChatItem = false;
        this.showChatWindow = false;
        this.newChatText = '';
        this.settings = this.appSettings.settings;
        this.chats = sideChatService.getChats();
        this.talks = this.sideChatService.getTalk();
    }
    ngOnInit() { }
    back() {
        this.showChatWindow = false;
        this.talks.shift();
        this.talks.length = 2;
    }
    getChat(chat) {
        this.searchText = '';
        this.showChatWindow = true;
        this.interlocutor = chat.author;
        this.talks.forEach(item => {
            if (item.side == 'left') {
                item.image = chat.image;
            }
        });
        this.talks.unshift(chat);
    }
    addChatItem($event) {
        if (($event.which === 1 || $event.which === 13) && this.newChatText.trim() != '') {
            this.talks.push(new SideChat('assets/img/users/user.jpg', 'Emilio Verdines', 'online', this.newChatText, new Date(), 'right'));
            this.newChatText = '';
            let chatContainer = document.querySelector('.chat-talk-list');
            setTimeout(() => {
                var nodes = chatContainer.querySelectorAll('.media');
                let newChatTextHeight = nodes[nodes.length - 1];
                chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
            });
        }
    }
};
SideChatComponent = tslib_1.__decorate([
    Component({
        selector: 'app-side-chat',
        templateUrl: './side-chat.component.html',
        styleUrls: ['./side-chat.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [SideChatService]
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings, SideChatService])
], SideChatComponent);
export { SideChatComponent };
//# sourceMappingURL=side-chat.component.js.map