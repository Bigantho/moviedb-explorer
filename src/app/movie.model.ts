export interface Genre {
  id: number;
  name: string;
}

export interface MovieModel {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genres: Genre[];
}