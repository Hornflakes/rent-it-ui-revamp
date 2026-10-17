import { Component, input } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.html',
})
export class AuthLayout {
    readonly heading = input.required<string>();
}
