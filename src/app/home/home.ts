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
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  movies: MovieModel[] = [];
  searchQuery: string = ''
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private movieService: Movie) { }

  ngOnInit() {
    this.loadMovies()
  }

  onSearchChange() {
    this.currentPage = 1
    if (this.searchQuery.trim()) {
      this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe({
        next: response => {
          this.movies = response.results;
          this.totalPages = response.total_pages;
        },
        error: error => {
          console.error('Error en la búsqueda:', error);
          this.movies = [];
          this.totalPages = 1;
        }
      });
    } else {
      this.loadMovies();
    }
  }
  selectMovie(movie: MovieModel) {
    this.movieService.selectMovie(movie);
  }

  private loadMovies() {
    this.movieService.getMovies(this.currentPage).subscribe({
      next: response => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      },
      error: error => {
        console.error('Error cargando películas populares:', error);
        this.movies = [];
        this.totalPages = 1;
      }
    });
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      if (this.searchQuery.trim()) {
        this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe({
          next: response => {
            this.movies = response.results;
            this.totalPages = response.total_pages;
          },
          error: error => {
            console.error('Error en la búsqueda:', error);
            this.movies = [];
          }
        });
      } else {
        this.loadMovies();
      }
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }


}
