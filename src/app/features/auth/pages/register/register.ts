import { Component, inject, signal, viewChild } from '@angular/core';
import {
    type FieldTree,
    form,
    FormField,
    FormRoot,
    maxLength,
    minLength,
    pattern,
    required,
    schema,
    type TreeValidationResult,
    validate,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { UserApi } from '@core/apis/user';
import type { RegisterBody } from '@core/models/user';
import { Session } from '@core/services/session';
import { AuthLayout } from '@features/auth/components/auth-layout/auth-layout';
import { ErrorDialog } from '@features/auth/components/error-dialog/error-dialog';

type Model = Omit<RegisterBody, 'role'> & {
    repeatPassword: string;
};

const rules = schema<Model>((path) => {
    required(path.username, { message: 'Baga numele' });
    pattern(path.username, /^[A-Za-z]*$/, { message: 'doar litere' });
    minLength(path.username, 3, { message: 'minim 3 caractere' });
    maxLength(path.username, 20, { message: 'maxim 20 caractere' });

    required(path.password, { message: 'Baga parola' });
    pattern(path.password, /[a-z]/, { message: '1 litera mica' });
    pattern(path.password, /[A-Z]/, { message: '1 litera mare' });
    pattern(path.password, /\d/, { message: '1 cifra' });
    pattern(path.password, /[^\p{L}\p{N}\s]/u, { message: '1 simbol' });
    minLength(path.password, 12, { message: 'minim 12 caractere' });
    pattern(path.password, /^\S*$/, { message: '0 spatii' });

    validate(path.repeatPassword, (ctx) =>
        ctx.value() === ctx.valueOf(path.password)
            ? undefined
            : { kind: 'passwordMismatch', message: 'Parola nu este confirmata' },
    );
});

@Component({
    imports: [AuthLayout, FormField, FormRoot, RouterLink, ErrorDialog],
    selector: 'app-register',
    templateUrl: './register.html',
})
export class Register {
    private readonly userApi = inject(UserApi);
    private readonly session = inject(Session);
    private readonly router = inject(Router);

    private readonly errorDialog = viewChild.required(ErrorDialog);

    private readonly model = signal<Model>({
        username: '',
        password: '',
        repeatPassword: '',
    });
    protected readonly submitted = signal(false);
    protected readonly form = form(this.model, rules, {
        submission: {
            action: (f) => this.submit(f),
            onInvalid: () => this.submitted.set(true),
        },
    });

    private async submit(f: FieldTree<Model>): Promise<TreeValidationResult> {
        const val = f().value();
        const body: RegisterBody = {
            username: val.username,
            password: val.password,
            role: 'client',
        };

        const res = await this.userApi.register(body);
        if (!res.ok) {
            this.errorDialog().showModal();
            return;
        }

        this.session.token.set(res.value.accessToken);
        await this.router.navigateByUrl('/');
    }
}
