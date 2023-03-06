import { Reservation } from "./reservation.model";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    reservations: Reservation[];
}