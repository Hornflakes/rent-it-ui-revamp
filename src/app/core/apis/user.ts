import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { toResult, type Result } from '@core/apis/result';
import type { AuthRes, LoginBody, RegisterBody } from '@core/models/user';
import { environment } from '@env/environment';

@Service()
export class UserApi {
    private readonly http = inject(HttpClient);

    private readonly url = `${environment.apiUrl}/users`;

    login(body: LoginBody): Promise<Result<AuthRes>> {
        return toResult(
            this.http.post<AuthRes>(`${this.url}/login`, body, {
                withCredentials: true,
            }),
            [401, 403],
        );
    }

    register(body: RegisterBody): Promise<Result<AuthRes>> {
        return toResult(
            this.http.post<AuthRes>(`${this.url}/register`, body, {
                withCredentials: true,
            }),
            [409],
        );
    }

    logout(): Promise<Result<void>> {
        return toResult(
            this.http.post<void>(
                `${this.url}/logout`,
                {},
                {
                    withCredentials: true,
                },
            ),
        );
    }

    refreshToken(): Promise<Result<AuthRes>> {
        return toResult(
            this.http.post<AuthRes>(
                `${this.url}/refresh-token`,
                {},
                {
                    withCredentials: true,
                },
            ),
        );
    }
}
