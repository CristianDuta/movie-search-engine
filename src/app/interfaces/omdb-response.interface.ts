import {ResultMovieItem} from "./result-movie-item.interface";

export interface OmdbResponse {
    Search: Array<ResultMovieItem>;
    totalResults: number;
    Response: string;
}
