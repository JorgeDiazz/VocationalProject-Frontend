import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/session/auth.service';
import { LoginService } from '../services/session/login.service';
   
@Injectable({
  providedIn: 'root'
})
   export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
      private login:LoginService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
              console.log("ERROR DEL CLIENTE"+errorMessage)
            } else {
              // server-side error
              console.log(error.error);
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              console.log("Servidor"+errorMessage)
           this.typeError(error);
            }
           // window.alert(errorMessage);
            return throwError(errorMessage);
          })
        )
    }


    typeError(error:HttpErrorResponse){
      let title=error.error.error;
      let mss= error.error.message+"\n"+"status: "+error.status;

      swal.fire(title,mss,'error');
      /*switch(cod){
      case 401:
        swal.fire('No Autorizado','No tienes los permisos para acceder','error');
       this.router.navigateByUrl("/login");
        this.login.logOut();
        break;
       case 400:
        swal.fire('No Autorizado','No tienes los permisos para acceder','error');
        this.router.navigateByUrl("/login");
        this.login.logOut();
        break;
        case 403:
        swal.fire('No Autorizado','No tienes los permisos para acceder','error');
        this.router.navigateByUrl("/login");
        this.login.logOut();
        break;
      }*/
    }

   }
 