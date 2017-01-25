import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SearchComponent} from "./components/search/search.component";
import {MovieComponent} from "./components/movie/movie.component";

const appRoutes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'movie/:imdbID',
        component: MovieComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
