import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { SidedrawComponent } from './components/sidedraw/sidedraw.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SidedrawComponent, HeaderComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SidedrawComponent]
})
export class SharedModule {}
