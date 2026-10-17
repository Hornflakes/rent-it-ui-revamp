import type { Routes } from '@angular/router';
import { authGuard, unauthGuard } from '@core/guards/auth';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/home/home').then((m) => m.Home),
        canActivate: [authGuard],
    },
    {
        path: '',
        loadChildren: () => import('@features/auth/auth.routes').then((m) => m.routes),
        canActivate: [unauthGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
