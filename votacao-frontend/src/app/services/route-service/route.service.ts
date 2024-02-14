import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private savedRoute: string | undefined;

  constructor() {
    const route = localStorage.getItem('savedRoute');
    if (route !== null && route !== undefined && route !== '') {
      this.savedRoute = route;
    }
  }

  saveRoute(route: string) {
    localStorage.setItem('savedRoute', route);
  }

  hasSavedRoute(): boolean {
    return this.savedRoute !== undefined && this.savedRoute !== '';
  }

  navigateToSavedRoute() {
    localStorage.setItem('savedRoute', '');
    return this.savedRoute;
  }
}
