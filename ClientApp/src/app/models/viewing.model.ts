import { Movie } from "./movie.model";

export interface Viewing {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    movieId: number;
    movie: Movie;
}