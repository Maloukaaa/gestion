import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let TodoService = class TodoService {
    constructor() {
        this._todoList = [
            { text: 'Check me out' },
            { text: 'Curabitur dignissim nunc a tellus euismod, quis pretium ipsum convallis' },
            { text: 'Vivamus dapibus pulvinar ipsum, sit amet elementum sapien tincidunt non' },
            { text: 'Praesent viverra nisl a pharetra viverra' },
            { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
            { text: 'Ex has semper alterum, expetenda dignissim' },
            { text: 'Nulla nisl urna, lobortis in leo vel, porta faucibus nulla' },
            { text: 'Simul erroribus ad usu' }
        ];
    }
    getTodoList() {
        return this._todoList;
    }
};
TodoService = tslib_1.__decorate([
    Injectable()
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map