// src/app/detail/detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, ActivatedRoute } from '@angular/router';
import { Movie} from '../movie';
import { MovieModel } from '../movie.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss']
})
export class movieDetail implements OnInit {
  movie: MovieModel | null = null;
  genresDisplay: string = ''; 

  constructor(
    private movieService: Movie,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieService.selectedMovie$.subscribe(movie => {
      this.movie = movie;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!this.movie || this.movie.id !== id) {
      this.movieService.getMovie(id).subscribe({
        next: movie => {
          this.movie = movie;
          this.movieService.selectMovie(movie);
          this.genresDisplay = movie.genres && movie.genres.length > 0
          ? movie.genres.map(genre => genre.name).join(', ')
          : 'No disponibles';
        },
        error: error => {
          console.error('Error cargando película:', error);
          this.movie = null;
          this.genresDisplay = 'No disponibles';
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}