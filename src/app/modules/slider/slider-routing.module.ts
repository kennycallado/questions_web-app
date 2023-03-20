import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideComponent } from './components/slide/slide.component';

import { SliderComponent } from './slider.component';

const routes: Routes = [
  { path: '', component: SliderComponent },
  { path: ':id', component: SlideComponent },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '/slider'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderRoutingModule { }
