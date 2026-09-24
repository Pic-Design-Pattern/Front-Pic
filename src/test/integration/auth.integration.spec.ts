import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthError, AuthService } from "../../app/core/auth/auth.service";

function sufixoUnico(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

const SENHA_VALIDA = 'SenhaForte#123';

describe('AuthService (integração real com o backend em ../new-back, better-auth)', () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        authService = TestBed.inject(AuthService);
    });

    it('cadastra um usuário novo com sucesso', async () => {
        const sufixo = sufixoUnico();
        await expect(
            authService.cadastrar({
                nomeDeUsuario: `teste_${sufixo}`,
                email: `teste-${sufixo}@femabee.test`,
                senha: SENHA_VALIDA,
            }),
        ).resolves.toBeUndefined();
    });

    it('cadastro com email duplicado não revela a duplicidade (proteção contra enumeração)', async () => {
        const sufixo = sufixoUnico();
        const payload = {
            nomeDeUsuario: `teste_${sufixo}`,
            email: `teste-${sufixo}@femabee.test`,
            senha: SENHA_VALIDA,
        };
        await authService.cadastrar(payload);

        // O better-auth responde como se tivesse dado certo mesmo com email já cadastrado —
        // é assim que evita vazar quais emails existem na base.
        await expect(authService.cadastrar(payload)).resolves.toBeUndefined();
    });

    it('bloqueia login até o email ser confirmado', async () => {
        const sufixo = sufixoUnico();
        const email = `teste-${sufixo}@femabee.test`;
        await authService.cadastrar({ nomeDeUsuario: `teste_${sufixo}`, email, senha: SENHA_VALIDA });

        await expect(
            authService.login({ email, senha: SENHA_VALIDA }),
        ).rejects.toMatchObject({ code: 'EMAIL_NOT_VERIFIED' } satisfies Partial<AuthError>);

        expect(authService.autenticado()).toBe(false);
    });

    it('rejeita login com senha errada', async () => {
        const sufixo = sufixoUnico();
        const email = `teste-${sufixo}@femabee.test`;
        await authService.cadastrar({ nomeDeUsuario: `teste_${sufixo}`, email, senha: SENHA_VALIDA });

        await expect(
            authService.login({ email, senha: 'SenhaErrada#999' }),
        ).rejects.toMatchObject({ code: 'INVALID_EMAIL_OR_PASSWORD' } satisfies Partial<AuthError>);
    });
});
