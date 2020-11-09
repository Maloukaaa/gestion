import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let MailSearchPipe = class MailSearchPipe {
    transform(value, args) {
        let searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(mail => {
                if (mail.sender || mail.subject) {
                    if (mail.sender.search(searchText) !== -1 || mail.subject.search(searchText) !== -1) {
                        return true;
                    }
                }
            });
        }
    }
};
MailSearchPipe = tslib_1.__decorate([
    Pipe({
        name: 'MailSearch'
    })
], MailSearchPipe);
export { MailSearchPipe };
//# sourceMappingURL=mail-search.pipe.js.map