import { AbstractControl } from "@angular/forms";

export function noWhiteSpaceValidato(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (String(control.value).trim().length===0)) {
        return { 'noWhiteSpace': true };
    }
    return null;
}