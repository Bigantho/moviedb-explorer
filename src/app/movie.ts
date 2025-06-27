import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError , map} from 'rxjs/operators';
import { MovieModel } from './movie.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Movie {
  private apiKey = environment.tmdbApiKey
  private apiUrl = environment.tmdbApiUrl
  private selectedMovieSubject = new BehaviorSubject<MovieModel | null>(null);
  selectedMovie$ = this.selectedMovieSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
  }


  getMovies(page: number = 1): Observable<{ results: MovieModel[], total_pages: number }> {
    return this.http.get<{ results: MovieModel[], total_pages: number }>(
      `${this.apiUrl}/movie/popular?page=${page}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        results: response.results.slice(0, 6), 
        total_pages: response.total_pages
      })),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return throwError(() => new Error('Error al obtener las películas'));
      })
    );
  }

  getMovie(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.apiUrl}/movie/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching movie:', error);
          return throwError(() => new Error('Error al obtener la película'));
        })
      );
  }

  searchMovies(query: string, page: number = 1): Observable<{ results: MovieModel[], total_pages: number }> {
    return this.http.get<{ results: MovieModel[], total_pages: number }>(
      `${this.apiUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        results: response.results.slice(0, 6), 
        total_pages: response.total_pages
      })),
      catchError(error => {
        console.error('Error searching movies:', error);
        return throwError(() => new Error('Error al buscar películas'));
      })
    );
  }

  selectMovie(movie: MovieModel) {
    this.selectedMovieSubject.next(movie);
  }
}

