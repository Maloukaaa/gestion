import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let UserSearchPipe = class UserSearchPipe {
    transform(value, args) {
        let searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(user => {
                if (user.profile.name) {
                    return user.profile.name.search(searchText) !== -1;
                }
                else {
                    return user.username.search(searchText) !== -1;
                }
            });
        }
    }
};
UserSearchPipe = tslib_1.__decorate([
    Pipe({ name: 'UserSearchPipe', pure: false })
], UserSearchPipe);
export { UserSearchPipe };
//# sourceMappingURL=user-search.pipe.js.map