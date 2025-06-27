import { Routes , RouterModule} from '@angular/router';
import {Home} from './home/home'
import {movieDetail } from './movie-detail/movie-detail'

export const routes: Routes = [
    { path: '', component: Home },
  { path: 'detail/:id', component: movieDetail },
];
