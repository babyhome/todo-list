import { Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: '', component: TopicComponent },
  { path: 'list', component: ListComponent },
];
