import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import type { AuthRes, LoginBody, RegisterBody } from '@core/models/user';
import { environment } from '@env/environment';
import type { Observable } from 'rxjs';

@Service()
export class UserApi {
    private readonly http = inject(HttpClient);

    private readonly url = `${environment.apiUrl}/users`;

    login(body: LoginBody): Observable<AuthRes> {
        return this.http.post<AuthRes>(`${this.url}/login`, body, {
            withCredentials: true,
        });
    }

    register(body: RegisterBody): Observable<AuthRes> {
        return this.http.post<AuthRes>(`${this.url}/register`, body, {
            withCredentials: true,
        });
    }

    logout(): Observable<void> {
        return this.http.post<void>(
            `${this.url}/logout`,
            {},
            {
                withCredentials: true,
            },
        );
    }

    refreshToken(): Observable<AuthRes> {
        return this.http.post<AuthRes>(
            `${this.url}/refresh-token`,
            {},
            {
                withCredentials: true,
            },
        );
    }
}
