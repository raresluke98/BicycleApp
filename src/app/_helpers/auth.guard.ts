import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        if (user) {
            // check if route is restricted by role
            // TODO: see if error disappeared (.roles)
            if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                // role not authorized, redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // auth, so return true
            return true;
        }
        // not logged in, redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
