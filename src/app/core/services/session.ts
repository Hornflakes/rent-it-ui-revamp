import { computed, effect, Service, signal } from '@angular/core';

const ACCESS_TOKEN_KEY = 'accessToken';

@Service()
export class Session {
    readonly token = signal<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));
    readonly isAuth = computed(() => !!this.token());

    constructor() {
        effect(() => {
            const t = this.token();

            if (!t) {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                return;
            }
            localStorage.setItem(ACCESS_TOKEN_KEY, t);
        });
    }
}
