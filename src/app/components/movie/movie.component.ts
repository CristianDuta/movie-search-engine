import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OmdbService} from "../../services/omdb.service";
import {ResultMovieItem} from "../../interfaces/result-movie-item.interface";
import {FavoriteMovieService} from "../../services/favorite-movie.service";

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
    public sub: any;
    public movie: ResultMovieItem;

    /**
     * MovieComponent constructor
     *
     * @param router
     * @param route
     * @param omdbService
     * @param favoriteMovieService
     */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private omdbService: OmdbService,
        public favoriteMovieService: FavoriteMovieService) {
    }

    /**
     * Called when the component is loaded
     * It gets the imdbId from the URL and fetches the details of the movie from OMDB
     */
    public ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            let imdbID = params['imdbID'];

            this.omdbService.fetchMovieByImdbId(imdbID, "full").subscribe(
                (response: ResultMovieItem) => {
                    if (response.Response !== 'False') {
                        this.movie = response;
                    } else {
                        this.redirectToSearchPage();
                    }
                }
            );
        });
    }

    /**
     * Called when navigating away
     */
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * Called when movie could not be found in the omdb
     * Redirects to the search page
     */
    public redirectToSearchPage() {
        this.router.navigate(['']);
    }
}
