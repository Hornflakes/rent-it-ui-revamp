import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, type Observable } from 'rxjs';

export type Result<T> =
    | { ok: true; value: T }
    | {
          ok: false;
          error: {
              status: number;
              message: string;
          };
      };

const hasMessage = (body: unknown): body is { message: string } =>
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    typeof body.message === 'string';

export const toResult = async <T>(
    obs: Observable<T>,
    expectedErrStatuses: readonly number[] = [],
): Promise<Result<T>> => {
    let value: T;

    try {
        value = await firstValueFrom(obs);
    } catch (err) {
        if (err instanceof HttpErrorResponse && expectedErrStatuses.includes(err.status)) {
            const body: unknown = err.error;

            return {
                ok: false,
                error: {
                    status: err.status,
                    message: hasMessage(body) ? body.message : err.message,
                },
            };
        }
        throw err;
    }

    return {
        ok: true,
        value,
    };
};
