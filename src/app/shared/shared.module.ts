import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinner
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinner,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
