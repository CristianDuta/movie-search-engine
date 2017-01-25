import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from "@angular/router";
import {OmdbService} from "../../services/omdb.service";
import {OmdbResponse} from "../../interfaces/omdb-response.interface";
import {ResultMovieItem} from "../../interfaces/result-movie-item.interface";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    public sub: any;
    public tempSearchString: string;
    public searchString: string;
    public searchResults: Array<ResultMovieItem>;
    public totalResults: number;
    public activePageNumber: number;
    public searchIsInProgress: boolean;
    public refreshFavoriteMovieList: number = 0;

    /**
     * SearchComponent constructor
     *
     * @param router
     * @param route
     * @param omdbService
     */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private omdbService: OmdbService) { }

    /**
     * Called when the component is loaded
     */
    ngOnInit(): void {
        this.sub = this.route.queryParams.map(params => params['searchString'] || '').subscribe(
            (searchString) => {
                this.tempSearchString = searchString;
                this.searchString = searchString;
                this.showLoadingBar();
                this.navigateToPage(1);
            }
        );
    }

    /**
     * Called when navigating away
     */
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * Search function executed when using the input box to search for a string
     */
    public search() {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'searchString': this.tempSearchString }
        };

        this.router.navigate([''], navigationExtras);
    }

    /**
     * Searches for a specific string set by ::search()
     * Executes the actual search
     *
     * @param page - used to navigate between search results
     */
    public navigateToPage(page: number) {
        this.activePageNumber = page;
        this.searchResults = [];

        this.omdbService.fetchMovieBySearch(this.searchString, page).subscribe(
            (response: OmdbResponse) => {
                if (response.Response !== 'False') {
                    for (let searchResult of response.Search) {
                        this.omdbService.fetchMovieByImdbId(searchResult.imdbID, "short").subscribe(
                            (response: ResultMovieItem) => {
                                this.searchResults.push(response);
                            }
                        );
                    }
                    this.totalResults = response.totalResults;
                } else {
                    this.totalResults = 0;
                }
                this.hideLoadingBar();
            }
        );
    }

    /**
     * Called when doing a search
     * Not called when navigating between pages
     * Show the loading bar animation
     */
    public showLoadingBar() {
        this.searchIsInProgress = true;
    }

    /**
     * Called whenever a search has been performed
     * Hides the loading bar animation
     */
    private hideLoadingBar() {
        this.searchIsInProgress = false;
    }
}
