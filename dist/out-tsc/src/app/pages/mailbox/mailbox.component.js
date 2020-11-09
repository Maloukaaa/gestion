import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { MailboxService } from './mailbox.service';
let MailboxComponent = class MailboxComponent {
    constructor(mailboxService) {
        this.mailboxService = mailboxService;
        this.type = 'all';
    }
    ngOnInit() {
        this.getMails();
    }
    getMails() {
        switch (this.type) {
            case 'all':
                this.mails = this.mailboxService.getAllMails();
                break;
            case 'starred':
                this.mails = this.mailboxService.getStarredMails();
                break;
            case 'sent':
                this.mails = this.mailboxService.getSentMails();
                break;
            case 'drafts':
                this.mails = this.mailboxService.getDraftMails();
                break;
            case 'trash':
                this.mails = this.mailboxService.getTrashMails();
                break;
            default:
                this.mails = this.mailboxService.getDraftMails();
        }
    }
    viewDetail(mail) {
        this.mail = this.mailboxService.getMail(mail.id);
        this.mails.forEach(m => m.selected = false);
        this.mail.selected = true;
        this.mail.unread = false;
        this.newMail = false;
    }
    compose() {
        this.mail = null;
        this.newMail = true;
    }
    setAsRead() {
        this.mail.unread = false;
    }
    setAsUnRead() {
        this.mail.unread = true;
    }
    delete() {
        this.mail.trash = true;
        this.mail.sent = false;
        this.mail.draft = false;
        this.mail.starred = false;
        this.getMails();
        this.mail = null;
    }
    changeStarStatus() {
        this.mail.starred = !this.mail.starred;
        this.getMails();
    }
    restore() {
        this.mail.trash = false;
        this.type = 'all';
        this.getMails();
        this.mail = null;
    }
};
MailboxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mailbox',
        templateUrl: './mailbox.component.html',
        styleUrls: ['./mailbox.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MailboxService]
    }),
    tslib_1.__metadata("design:paramtypes", [MailboxService])
], MailboxComponent);
export { MailboxComponent };
//# sourceMappingURL=mailbox.component.js.map