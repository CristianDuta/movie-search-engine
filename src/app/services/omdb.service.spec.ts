/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {OmdbService} from './omdb.service';
import {OmdbResponse} from "../interfaces/omdb-response.interface";
import {Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('OmdbService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OmdbService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]
        });
    });

    it('should fetch movie by search string', inject([OmdbService, MockBackend], (service: OmdbService, mockBackend: MockBackend) => {
        expect(service).toBeTruthy();
        let jsonResponse = {
            Response: "False",
            totalResults: 0,
            Search: []
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual("https://www.omdbapi.com/?v=1&type=movie&r=json&s=testString&page=1");
            expect(connection.request.method).toEqual(RequestMethod.Get);
            let options = new ResponseOptions({
                body: JSON.stringify(jsonResponse)
            });
            connection.mockRespond(new Response(options));
        });

        service.fetchMovieBySearch('testString', 1).subscribe(
            (response: OmdbResponse) => {
                expect(response).toEqual(jsonResponse);
            }
        );
    }));

    it('should fetch movie by imdbId', inject([OmdbService, MockBackend], (service: OmdbService, mockBackend: MockBackend) => {
        expect(service).toBeTruthy();
        let jsonResponse = {
            "Title": "Arrival",
            "Year": "2016",
            "Rated": "PG-13",
            "Released": "11 Nov 2016",
            "Runtime": "116 min",
            "Genre": "Drama, Mystery, Sci-Fi",
            "Director": "Denis Villeneuve",
            "Writer": "Eric Heisserer (screenplay), Ted Chiang (based on the story \"Story of Your Life\" written by)",
            "Actors": "Amy Adams, Jeremy Renner, Forest Whitaker, Michael Stuhlbarg",
            "Plot": "When mysterious spacecraft touch down across the globe, an elite team - led by expert linguist..",
            "Language": "English, Russian, Mandarin",
            "Country": "USA",
            "Awards": "Nominated for 2 Golden Globes. Another 28 wins & 150 nominations.",
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg",
            "Metascore": "81",
            "imdbRating": "8.3",
            "imdbVotes": "113,438",
            "imdbID": "tt2543164",
            "Type": "movie",
            "Response": "True"
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual("https://www.omdbapi.com/?v=1&type=movie&r=json&i=tt2543164&plot=short");
            expect(connection.request.method).toEqual(RequestMethod.Get);
            let options = new ResponseOptions({
                body: JSON.stringify(jsonResponse)
            });
            connection.mockRespond(new Response(options));
        });

        service.fetchMovieByImdbId('tt2543164', 'short').subscribe(
            (response: OmdbResponse) => {
                expect(response).toEqual(jsonResponse);
            }
        );
    }));
});
