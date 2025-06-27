// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { Movie } from '../movie';
import { MovieModel } from '../movie.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  movies: MovieModel[] = [];
  searchQuery: string = ''

  constructor(private movieService: Movie) {}

  ngOnInit() {
   this.loadMovies()
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      // Buscar películas si hay un término
      this.movieService.searchMovies(this.searchQuery).subscribe({
        next: response => {
          this.movies = response.results;
        },
        error: error => {
          console.error('Error en la búsqueda:', error);
          this.movies = []; // Limpia la lista en caso de error
        }
      });
    } else {
      // Cargar películas populares si el input está vacío
      this.loadMovies();
    }
  }
  selectMovie(movie: MovieModel) {
    this.movieService.selectMovie(movie);
  }

  private loadMovies(){
    this.movieService.getMovies().subscribe({
      next: response => {
        this.movies = response.results;
      },
      error: error => {
        console.error('Error cargando películas populares:', error);
        this.movies = [];
      }
    });
  }
}
