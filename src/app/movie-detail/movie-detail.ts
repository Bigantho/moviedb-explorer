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

  constructor(
    private movieService: Movie,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieService.selectedMovie$.subscribe(movie => {
      this.movie = movie;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("el id",id);
    
    if (!this.movie || this.movie.id !== id) {
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
        this.movieService.selectMovie(movie);
      });
    }
  }

  goBack() {
    window.history.back();
  }
}