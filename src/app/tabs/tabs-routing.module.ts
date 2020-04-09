import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
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
        path: 'workouts',
        children: [
          {
            path: '',
            loadChildren: () => import('../workouts/workouts.module').then((m) => m.WorkoutsPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/wod',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/wod',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
