import { Component, signal } from '@angular/core';
import {
    form,
    FormField,
    FormRoot,
    maxLength,
    minLength,
    pattern,
    required,
    schema,
    validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import type { RegisterBody } from '@core/models/user';
import { AuthLayout } from '@features/auth/components/auth-layout/auth-layout';

type RegisterFormModel = Omit<RegisterBody, 'role'> & {
    repeatPassword: string;
};

const registerSchema = schema<RegisterFormModel>((register) => {
    required(register.username, { message: 'Baga numele' });
    pattern(register.username, /^[A-Za-z]*$/, { message: 'doar litere' });
    minLength(register.username, 3, { message: 'minim 3 caractere' });
    maxLength(register.username, 20, { message: 'maxim 20 caractere' });

    required(register.password, { message: 'Baga parola' });
    pattern(register.password, /[a-z]/, { message: '1 litera mica' });
    pattern(register.password, /[A-Z]/, { message: '1 litera mare' });
    pattern(register.password, /\d/, { message: '1 cifra' });
    pattern(register.password, /[^\p{L}\p{N}\s]/u, { message: '1 simbol' });
    minLength(register.password, 12, { message: 'minim 12 caractere' });
    pattern(register.password, /^\S*$/, { message: '0 spatii' });

    validate(register.repeatPassword, ({ value, valueOf }) =>
        value() === valueOf(register.password)
            ? undefined
            : { kind: 'passwordMismatch', message: 'Parola nu este confirmata' },
    );
});

@Component({
    imports: [AuthLayout, FormField, FormRoot, RouterLink],
    selector: 'app-register',
    templateUrl: './register.html',
})
export class Register {
    private readonly registerModel = signal<RegisterFormModel>({
        username: '',
        password: '',
        repeatPassword: '',
    });
    protected readonly registerForm = form(this.registerModel, registerSchema, {
        submission: {
            action: async (f) => {
                console.log(f().value());
            },
        },
    });
}
