import {Injectable} from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {ResultMovieItem} from "../interfaces/result-movie-item.interface";

@Injectable()
export class FavoriteMovieService {
    /**
     * FavoriteMovieService constructor
     *
     * @param localStorageService
     */
    constructor(protected localStorageService: LocalStorageService) {
    }

    /**
     * Add/remove an imdbId to/from the localStorage
     *
     * @param movie
     */
    public toggleMovieInFavorites(movie: ResultMovieItem) {
        if (this.isMovieFavorited(movie)) {
            this.localStorageService.remove(movie.imdbID);
        } else {
            this.localStorageService.set(movie.imdbID, true);
        }
    }

    /**
     * Checks if a imdbId is in the localStorage
     *
     * @param movie
     * @returns {boolean}
     */
    public isMovieFavorited(movie: ResultMovieItem): boolean {
        return this.localStorageService.get(movie.imdbID) === true;
    }

    /**
     * Retrieves all imdbIds from the localStorage
     *
     * @returns {Array<string>}
     */
    public getAllStoredFavoriteMovies(): Array<string> {
        return this.localStorageService.keys();
    }
}
