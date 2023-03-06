import { User } from "./user.model";
import { Viewing } from "./viewing.model";

export interface Reservation {
    id: number;
    viewingId: number;
    viewing: Viewing;
    userId: number;
    user: User;
    selectedSeats: string;
}