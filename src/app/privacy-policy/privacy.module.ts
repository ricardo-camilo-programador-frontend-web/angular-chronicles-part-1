import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyComponent,
        data: { preload: false }
      }
    ])
  ]
})
export class PrivacyModule { }