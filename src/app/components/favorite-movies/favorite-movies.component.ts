import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import {OmdbService} from "../../services/omdb.service";
import {FavoriteMovieService} from "../../services/favorite-movie.service";
import {ResultMovieItem} from "../../interfaces/result-movie-item.interface";

@Component({
    selector: 'app-favorite-movies',
    templateUrl: './favorite-movies.component.html',
    styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnChanges {
    @Input() refreshFavoriteMovieList: number;
    @Input() searchResults: Array<ResultMovieItem>;

    public displayFavoriteMovies: boolean = false;
    public favoriteMovieList: Array<ResultMovieItem> = [];

    /**
     * FavoriteMoviesComponent constructor
     *
     * @param omdbService
     * @param favoriteMovieService
     */
    constructor(private omdbService: OmdbService, private favoriteMovieService: FavoriteMovieService) {
    }

    /**
     * Toggles the visibility of the Favorite Movie List
     */
    public toggleDisplayFavoriteMovies() {
        this.displayFavoriteMovies = !this.displayFavoriteMovies;
    }

    /**
     * This is executed every time the page is loaded
     * It listens for changes
     *
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (changes['refreshFavoriteMovieList']) {
            this.getFavoriteMovieList();
        }

        if (changes['searchResults']) {
            this.displayFavoriteMovies = false;
        }
    }

    /**
     * Fetches the movies imdb ids from the localStorage and then
     *  it calls the omdbService to get the movie details
     */
    private getFavoriteMovieList() {
        this.favoriteMovieList = [];
        let storedFavoriteMovieImdbIds = this.favoriteMovieService.getAllStoredFavoriteMovies();
        for (let favoriteMovieImdbId of storedFavoriteMovieImdbIds) {
            this.omdbService.fetchMovieByImdbId(favoriteMovieImdbId, "short").subscribe(
                (response: ResultMovieItem) => {
                    this.favoriteMovieList.push(response);
                    this.favoriteMovieList.sort(this.sortFavoriteMovieListByMovieTitle);
                }
            );
        }
    }

    /**
     * Function is used to sort the fetched movies from omdbService
     *
     * @param firstMovie
     * @param secondMovie
     * @returns {number}
     */
    private sortFavoriteMovieListByMovieTitle(firstMovie: ResultMovieItem, secondMovie: ResultMovieItem): number {
        if (firstMovie.Title < secondMovie.Title) {
            return -1;
        } else if (firstMovie.Title > secondMovie.Title) {
            return 1;
        } else {
            return 0;
        }
    }
}
