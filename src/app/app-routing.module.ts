import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@/app/layouts/MainLayout.component';
import { SelectivePreloadingStrategyService } from '@/app/selective-preloading-strategy.service';
import { HomeComponent } from '@/app/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { PrivacyComponent } from '@/app/privacy-policy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ]
  },
  {
    path: 'privacy-policy',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: PrivacyComponent,
      }
    ]
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: SelectivePreloadingStrategyService,
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
