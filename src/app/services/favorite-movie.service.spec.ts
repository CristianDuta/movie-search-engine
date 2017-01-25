/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {FavoriteMovieService} from './favorite-movie.service';
import {LocalStorageModule} from "angular-2-local-storage";

describe('FavoriteMovieService', () => {
    let movie = {
        Title: "Arrival",
        Year: 2016,
        Rated: "PG-13",
        Released: "11 Nov 2016",
        Runtime: "116 min",
        Genre: "Drama, Mystery, Sci-Fi",
        Director: "Denis Villeneuve",
        Writer: "Eric Heisserer (screenplay), Ted Chiang (based on the story \"Story of Your Life\" written by)",
        Actors: "Amy Adams, Jeremy Renner, Forest Whitaker, Michael Stuhlbarg",
        Plot: "When mysterious spacecraft touch down across the globe, an elite team - led by expert linguist..",
        Language: "English, Russian, Mandarin",
        Country: "USA",
        Awards: "Nominated for 2 Golden Globes. Another 28 wins & 150 nominations.",
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg",
        Metascore: 81,
        imdbRating: 8.3,
        imdbVotes: "113,438",
        imdbID: "tt2543164",
        Type: "movie",
        Response: "True"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                LocalStorageModule.withConfig({
                    prefix: 'my-app',
                    storageType: 'localStorage'
                })
            ],
            providers: [FavoriteMovieService]
        });
    });

    it('short be able to get stored favorite movies', inject([FavoriteMovieService], (service: FavoriteMovieService) => {
        expect(service).toBeTruthy();

        if (!service.isMovieFavorited(movie)) {
            service.toggleMovieInFavorites(movie);
        }

        let storedFavoriteMovieList = service.getAllStoredFavoriteMovies();
        expect(storedFavoriteMovieList[0]).toEqual("tt2543164");
    }));

    it('short be able to add movie to favorites', inject([FavoriteMovieService], (service: FavoriteMovieService) => {
        expect(service).toBeTruthy();

        if (service.isMovieFavorited(movie)) {
            service.toggleMovieInFavorites(movie);
        }

        expect(service.isMovieFavorited(movie)).toBeFalsy();
        service.toggleMovieInFavorites(movie);
        expect(service.isMovieFavorited(movie)).toBeTruthy();
    }));

    it('short be able to remove movie from favorites', inject([FavoriteMovieService], (service: FavoriteMovieService) => {
        expect(service).toBeTruthy();

        if (!service.isMovieFavorited(movie)) {
            service.toggleMovieInFavorites(movie);
        }

        expect(service.isMovieFavorited(movie)).toBeTruthy();
        service.toggleMovieInFavorites(movie);
        expect(service.isMovieFavorited(movie)).toBeFalsy();
    }));
});
