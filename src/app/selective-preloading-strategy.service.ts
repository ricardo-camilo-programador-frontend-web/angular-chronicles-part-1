import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const shouldPreload = this.shouldPreloadRoute(route);
    
    if (shouldPreload && route.path != null) {
      this.preloadedModules.push(route.path);
      console.log('Preloaded: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }

  private shouldPreloadRoute(route: Route): boolean {
    if (!route.path || !route.data) {
      return false;
    }

    if (route.data['preload'] === false) {
      return false;
    }

    if (route.data['preload'] === true) {
      return true;
    }

    const criticalRoutes = ['', 'privacy-policy'];
    return criticalRoutes.includes(route.path);
  }

  getPreloadedModules(): string[] {
    return [...this.preloadedModules];
  }

  clearPreloadedModules(): void {
    this.preloadedModules = [];
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
