import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProjectsComponent = class ProjectsComponent {
    constructor() {
        this.projects = [
            { image: 'assets/img/projects/1.jpg', name: 'Project Name 1', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 10 },
            { image: 'assets/img/projects/2.jpg', name: 'Project Name 2', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },
            { image: 'assets/img/projects/3.jpg', name: 'Project Name 3', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 15 },
            { image: 'assets/img/projects/4.jpg', name: 'Project Name 4', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 43 }
        ];
    }
    ngOnInit() {
    }
};
ProjectsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-projects',
        templateUrl: './projects.component.html',
        styleUrls: ['./projects.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ProjectsComponent);
export { ProjectsComponent };
//# sourceMappingURL=projects.component.js.map