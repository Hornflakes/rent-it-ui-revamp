import { Component, type ElementRef, input, viewChild } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.html',
})
export class ErrorDialog {
    readonly message = input.required<string>();

    private readonly dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

    showModal(): void {
        this.dialogEl().nativeElement.showModal();
    }
}
