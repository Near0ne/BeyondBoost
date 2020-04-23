import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'wod',
        children: [
          {
            path: '',
            loadChildren: () => import('../wod/wod.module').then((m) => m.WodPageModule),
          },
        ],
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'exercises',
        loadChildren: () => import('../exercises/exercises.module').then((m) => m.ExercisesPageModule),
      },
      {
        path: '',
        redirectTo: '/app/wod',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/wod',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
