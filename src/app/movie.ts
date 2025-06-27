import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
  }


  getMovies(): Observable<{ results: MovieModel[] }> {
    return this.http.get<{ results: MovieModel[] }>(`${this.apiUrl}/movie/popular`,{ headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Error al obtener las películas'));
        })
      );
  }

  getMovie(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.apiUrl}/movie/${id}`,{ headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching movie:', error);
          return throwError(() => new Error('Error al obtener la película'));
        })
      );
  }

  selectMovie(movie: MovieModel) {
    this.selectedMovieSubject.next(movie);
  }
}

