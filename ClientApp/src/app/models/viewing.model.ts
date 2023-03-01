import { Movie } from "./movie.model";
import { Reservation } from "./reservation.model";

export interface Viewing {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    movieId: number;
    movie: Movie;
    reservations: Reservation[];
}