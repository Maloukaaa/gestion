import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
let PipesModule = class PipesModule {
};
PipesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            ProfilePicturePipe,
            ChatPersonSearchPipe,
            UserSearchPipe,
            TruncatePipe,
            MailSearchPipe
        ],
        exports: [
            ProfilePicturePipe,
            ChatPersonSearchPipe,
            UserSearchPipe,
            TruncatePipe,
            MailSearchPipe
        ]
    })
], PipesModule);
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map