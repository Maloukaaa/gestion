import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ChatPersonSearchPipe = class ChatPersonSearchPipe {
    transform(value, args) {
        let searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(message => {
                if (message.author) {
                    return message.author.search(searchText) !== -1;
                }
            });
        }
    }
};
ChatPersonSearchPipe = tslib_1.__decorate([
    Pipe({ name: 'ChatPersonSearchPipe' })
], ChatPersonSearchPipe);
export { ChatPersonSearchPipe };
//# sourceMappingURL=chat-person-search.pipe.js.map