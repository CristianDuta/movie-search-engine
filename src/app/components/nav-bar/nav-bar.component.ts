import {Component} from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    public projectName: string;
    public menuItems: Array<any>;

    /**
     * NavBarComponent constructor
     */
    constructor() {
        this.projectName = 'Movie Database';
        this.menuItems = [];
    }
}
