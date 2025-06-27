// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Movie } from '../movie';
import { MovieModel } from '../movie.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  movies: MovieModel[] = [];

  constructor(private movieService: Movie) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response.results;
    });
  }

  selectMovie(movie: MovieModel) {
    this.movieService.selectMovie(movie);
  }
}
