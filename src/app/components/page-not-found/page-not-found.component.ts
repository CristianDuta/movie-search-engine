import {Component} from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

    public message: string;

    /**
     * PageNotFoundComponent constructor
     */
    constructor() {
        this.message = '404 Page not found!';
    }
}
