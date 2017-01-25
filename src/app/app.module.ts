import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routes';
import {LocalStorageModule} from "angular-2-local-storage";

import {OmdbService} from "./services/omdb.service";
import {FavoriteMovieService} from "./services/favorite-movie.service";

import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SearchComponent} from './components/search/search.component';
import {MovieComponent} from './components/movie/movie.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {FavoriteMoviesComponent} from './components/favorite-movies/favorite-movies.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        PageNotFoundComponent,
        SearchComponent,
        MovieComponent,
        SearchResultsComponent,
        FavoriteMoviesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
    ],
    providers: [
        OmdbService,
        FavoriteMovieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
