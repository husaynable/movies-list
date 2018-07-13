import { Movie } from './movie';

export interface MovieDetails extends Movie {
  Director: string;
  Writer: string;
  Actors: string;
  Genre: string;
}
