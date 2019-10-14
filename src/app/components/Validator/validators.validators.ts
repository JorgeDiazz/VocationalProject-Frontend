import { AbstractControl } from "@angular/forms";

export function noWhiteSpace(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && ( (String(control.value).trim().length===0)||(String(control.value).charAt(0)===" ") )) {
         
        return { 'noWhiteSpace': true };
    }
    return null;
}