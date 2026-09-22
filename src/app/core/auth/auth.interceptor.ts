import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

/** Garante que o cookie de sessão viaje em toda chamada à API; em 401, limpa a sessão local e manda pro login. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const requisicaoComCredenciais = req.clone({ withCredentials: true });

    return next(requisicaoComCredenciais).pipe(
        catchError((erro) => {
            if (erro.status === 401) {
                authService.invalidarSessaoLocal();
                router.navigateByUrl('/login');
            }
            return throwError(() => erro);
        }),
    );
};
