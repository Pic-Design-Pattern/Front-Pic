import { computed, Injectable, signal } from "@angular/core";
import { authClient } from "./auth-client";

export interface CadastrarUsuarioPayload {
    nomeDeUsuario: string;
    email: string;
    senha: string;
}

export interface LoginPayload {
    email: string;
    senha: string;
}

export interface EsqueciSenhaPayload {
    email: string;
    redirectTo: string;
}

export interface RedefinirSenhaPayload {
    novaSenha: string;
    token: string;
}

export interface UsuarioLogado {
    email: string;
    nomeDeUsuario: string;
}

/** Erro de uma operação do better-auth — `code` vem do backend (ex.: EMAIL_NOT_VERIFIED, INVALID_EMAIL_OR_PASSWORD, INVALID_TOKEN). */
export class AuthError extends Error {
    readonly code?: string;

    constructor(erro: { code?: string; message?: string }) {
        super(erro.message ?? 'Erro de autenticação.');
        this.code = erro.code;
    }
}

function paraUsuarioLogado(user: { email: string; name: string } | null | undefined): UsuarioLogado | null {
    return user ? { email: user.email, nomeDeUsuario: user.name } : null;
}

/** Sessão do usuário: cadastro/login/logout via better-auth, sessão mantida por cookie HTTP-only (não há mais token manipulável no cliente). */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _usuario = signal<UsuarioLogado | null>(null);
    private readonly _solicitando = signal(false);

    readonly solicitando = this._solicitando.asReadonly();
    readonly usuarioLogado = this._usuario.asReadonly();
    readonly autenticado = computed(() => this._usuario() !== null);

    /** Resolve quando a checagem de sessão inicial (cookie existente, se houver) termina — usado pelo authGuard. */
    readonly pronto: Promise<boolean>;

    constructor() {
        this.pronto = this.carregarSessaoInicial();
    }

    private async carregarSessaoInicial(): Promise<boolean> {
        try {
            const { data } = await authClient.getSession();
            this._usuario.set(paraUsuarioLogado(data?.user));
        } catch {
            // Backend inalcançável (rede caiu, servidor fora do ar) — trata como não autenticado
            // em vez de deixar a promise `pronto` rejeitada e travar o authGuard.
            this._usuario.set(null);
        }
        return this._usuario() !== null;
    }

    async cadastrar(payload: CadastrarUsuarioPayload): Promise<void> {
        this._solicitando.set(true);
        try {
            const { error } = await authClient.signUp.email({
                name: payload.nomeDeUsuario,
                email: payload.email,
                password: payload.senha,
            });
            if (error) throw new AuthError(error);
        } finally {
            this._solicitando.set(false);
        }
    }

    async login(payload: LoginPayload): Promise<void> {
        this._solicitando.set(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email: payload.email,
                password: payload.senha,
            });
            if (error) throw new AuthError(error);
            this._usuario.set(paraUsuarioLogado(data?.user));
        } finally {
            this._solicitando.set(false);
        }
    }

    /** Redireciona a página inteira para o consentimento do Google — não há retorno síncrono em caso de sucesso. */
    async loginComGoogle(): Promise<void> {
        await authClient.signIn.social({ provider: 'google', callbackURL: 'https://game.femabee.online/abelhas' });
    }

    async esqueciSenha(payload: EsqueciSenhaPayload): Promise<void> {
        this._solicitando.set(true);
        try {
            const { error } = await authClient.requestPasswordReset(payload);
            if (error) throw new AuthError(error);
        } finally {
            this._solicitando.set(false);
        }
    }

    async redefinirSenha(payload: RedefinirSenhaPayload): Promise<void> {
        this._solicitando.set(true);
        try {
            const { error } = await authClient.resetPassword({ newPassword: payload.novaSenha, token: payload.token });
            if (error) throw new AuthError(error);
        } finally {
            this._solicitando.set(false);
        }
    }

    logout(): void {
        this._usuario.set(null);
        void authClient.signOut();
    }

    /** Limpa a sessão local sem chamar o backend — usado pelo interceptor em 401 (a sessão já caiu no servidor). */
    invalidarSessaoLocal(): void {
        this._usuario.set(null);
    }
}
