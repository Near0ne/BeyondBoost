import { NgModule } from '@angular/core';

import { WodPageRoutingModule } from './wod-routing.module';

import { WodPage } from './wod.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, WodPageRoutingModule],
  declarations: [WodPage],
})
export class WodPageModule {}
