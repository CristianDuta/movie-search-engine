import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class OmdbService {
    private omdbRequestUrl: string = "http://www.omdbapi.com/?v=1&type=movie&r=json";

    /**
     * OmdbService constructor
     *
     * @param http
     */
    constructor(protected http: Http) {
    }

    /**
     * Searches the omdb and returns a list of matching movies
     * Does not return the movies with the full details
     * @see fetchMovieByImdbId for more info
     *
     * @param searchString
     * @param page
     * @returns {Observable<any>}
     */
    public fetchMovieBySearch(searchString: string, page: number) {
        return this.http.get(this.omdbRequestUrl + "&s=" + searchString + "&page=" + page).map(res => res.json());
    }

    /**
     * Searches the omdb for the imdbId and returns the movie
     *
     * @param imdbId
     * @param plot
     * @returns {Observable<ResultMovieItem>}
     */
    public fetchMovieByImdbId(imdbId: string, plot: string) {
        return this.http.get(this.omdbRequestUrl + "&i=" + imdbId + "&plot=" + plot).map(res => res.json());
    }
}
