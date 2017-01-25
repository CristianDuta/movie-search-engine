import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ResultMovieItem} from "../../interfaces/result-movie-item.interface";
import {Page} from "../../interfaces/page.interface";
import {FavoriteMovieService} from "../../services/favorite-movie.service";

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnChanges {
    @Input() searchResults: Array<ResultMovieItem>;
    @Input() totalResults: number;
    @Input() pageNumber: number;
    @Output() onPageChange = new EventEmitter<number>();
    @Output() onToggleFavoriteMovie = new EventEmitter<any>();
    public pagination: Array<Page>;

    /**
     * SearchResultsComponent constructor
     *
     * @param favoriteMovieService
     */
    public constructor(public favoriteMovieService: FavoriteMovieService) {
    }

    /**
     * Called when clicking on the `Add to favorites` link
     * Add the imdbId of the selected
     *
     * @param movie
     */
    public toggleMovieInFavorites(movie: ResultMovieItem) {
        this.favoriteMovieService.toggleMovieInFavorites(movie);
        this.onToggleFavoriteMovie.emit();
    }

    /**
     * This is executed every time the page is loaded
     * It listens for changes
     * It recreates the pagination
     *
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges): void {
        this.resetPagination();
        this.createPagination();
    }

    /**
     * Moves to a specific page number
     * Emits an event in order to use ::navigateToPage(page: number) to change the page
     *
     * @param pageNumber
     */
    public moveToPage(pageNumber: number) {
        this.onPageChange.emit(pageNumber);
    }

    /**
     * Creates the pagination, setting the active page
     */
    private createPagination() {
        this.resetPagination();
        let startPageNumber = 1;
        let lastPageNumber = 10;

        if (this.pageNumber > 6) {
            startPageNumber = this.pageNumber - 5;
            lastPageNumber = this.pageNumber + 4;
        }

        let totalNumberOfPages = Math.ceil(this.totalResults / 10);
        if (lastPageNumber > totalNumberOfPages) {
            lastPageNumber = totalNumberOfPages;
        }

        for (let pageNumber = startPageNumber; pageNumber <= lastPageNumber; pageNumber++) {
            this.pagination.push({
                pageNumber: pageNumber,
                isActive: (pageNumber === this.pageNumber)
            });
        }
    }

    /**
     * Resets the pagination
     */
    private resetPagination() {
        this.pagination = [];
    }
}
