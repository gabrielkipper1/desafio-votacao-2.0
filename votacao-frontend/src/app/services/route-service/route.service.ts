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
    console.log('Has saved route: ' + this.savedRoute);
    console.log(this.savedRoute !== undefined && this.savedRoute !== '')
    return this.savedRoute !== undefined && this.savedRoute !== '';
  }

  navigateToSavedRoute() {
    localStorage.setItem('savedRoute', '');
    console.log('Navigating to saved route: ' + this.savedRoute);
    return this.savedRoute;
  }
}
