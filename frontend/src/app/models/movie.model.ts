import { Viewing } from "./viewing.model";

export interface Movie {
    id: number;
    name: string;
    description: string;
    posterUrl: string;
    durationHours: number;
    durationMinutes: number;
    viewings: Viewing[];
}