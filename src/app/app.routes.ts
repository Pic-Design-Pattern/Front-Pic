import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { abelhaSelecionadaGuard } from './core/jogador/abelha-selecionada.guard';

export const routes: Routes = [
    {
        path: 'cadastro',
        loadComponent: () => import('./cadastro/cadastro.component').then(m => m.CadastroComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'verificar-email',
        loadComponent: () => import('./login/verificar-email.component').then(m => m.VerificarEmailComponent)
    },
    {
        path: 'esqueci-senha',
        loadComponent: () => import('./login/esqueci-senha.component').then(m => m.EsqueciSenhaComponent)
    },
    {
        path: 'redefinir-senha',
        loadComponent: () => import('./login/redefinir-senha.component').then(m => m.RedefinirSenhaComponent)
    },
    {
        path: 'abelhas',
        canActivate: [authGuard],
        loadComponent: () => import('./abelhas/selecao-abelha.component').then(m => m.SelecaoAbelhaComponent)
    },
    {
        path: '',
        canActivate: [authGuard, abelhaSelecionadaGuard],
        loadComponent: () => import('./game-shell/game-shell.component').then(m => m.GameShellComponent)
    },
];
