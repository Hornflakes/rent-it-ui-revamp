import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Session } from '@core/services/session';

export const authGuard: CanActivateFn = () => {
    const session = inject(Session);
    const router = inject(Router);

    if (!session.isAuth()) {
        return router.parseUrl('/login');
    }
    return true;
};

export const unauthGuard: CanActivateFn = () => {
    const session = inject(Session);
    const router = inject(Router);

    if (session.isAuth()) {
        return router.parseUrl('/');
    }
    return true;
};
