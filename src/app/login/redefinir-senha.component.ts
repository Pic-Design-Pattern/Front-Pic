import { Component, inject, viewChild } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TextComponent } from "../../ui/typography/text.component";
import { LinkComponent } from "../../ui/typography/link.component";
import { IconComponent } from "../../ui/icon/icon.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { LabelComponent } from "../../ui/label/label.component";
import { FieldComponent } from "../../ui/field/field.component";
import { TitleComponent } from "../../ui/typography/title.component";
import { BeeCardContentComponent, BeeCardHeaderComponent, BeeCardComponent } from "../../ui/card/card.component";
import { InputComponent } from "../../ui/input/input.component";
import { IndicatorComponent } from "../../ui/indicator/indicator.component";
import { Indication } from "../../ui/indicator/indication";
import { AuthError, AuthService } from "../core/auth/auth.service";
import { SomService } from "../../services/som/som.service";

@Component({
    selector: 'bee-redefinir-senha',
    template: `
    <bee-card class="w-fit max-w-full">
        <bee-card-header>
            /redefinir_senha
        </bee-card-header>
        <bee-card-content class="flex items-center justify-center">
            <form class="w-full max-w-full md:max-w-xl flex justify-center flex-col gap-4" [formGroup]="form" (ngSubmit)="onSubmit()">
                <bee-title> Escolha uma nova senha </bee-title>

                <bee-field>
                    <label bee-label for="input-senha">Nova senha</label>
                    <input type="password" bee-input id="input-senha" formControlName="novaSenha" />
                    <bee-text class="text-neutral-500!">Mín. 8 caracteres, com maiúscula, minúscula, número e símbolo.</bee-text>
                </bee-field>

                <bee-indicator class="w-full!" #indicator />

                <button fluid bee-button type="submit" [disabled]="form.invalid || authService.solicitando() || !token">
                    <bee-icon icon="lock" />
                    Redefinir senha
                </button>

                <hr>

                <div class="w-full flex flex-row items-center justify-center gap-2">
                    <bee-link href="/login" class="text-amber-600!">Voltar para o login</bee-link>
                </div>
            </form>
        </bee-card-content>
    </bee-card>

    <img src="/login-image.png" class="hidden md:block w-1/2" alt="">
    `,
    host: {
        class: 'min-h-screen w-screen flex flex-col md:flex-row gap-6 md:gap-16 items-center justify-center pattern-background p-4 overflow-y-auto'
    },
    imports: [TextComponent, LinkComponent, IconComponent, ButtonComponent, LabelComponent, FieldComponent, TitleComponent, BeeCardContentComponent, BeeCardHeaderComponent, BeeCardComponent, InputComponent, ReactiveFormsModule, IndicatorComponent]
})
export class RedefinirSenhaComponent {
    protected readonly authService = inject(AuthService);
    private readonly somService = inject(SomService);
    private readonly formBuilder = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    private readonly indicator = viewChild<IndicatorComponent>('indicator');

    /** Vem do link do e-mail (redirectTo da tela de esqueci-senha, com ?token=... anexado pelo backend). */
    protected readonly token = this.route.snapshot.queryParamMap.get('token');

    protected readonly form = this.formBuilder.nonNullable.group({
        novaSenha: ['', [Validators.required, Validators.minLength(8)]],
    });

    protected async onSubmit(): Promise<void> {
        if (this.form.invalid || !this.token) return;

        const { novaSenha } = this.form.getRawValue();

        try {
            await this.authService.redefinirSenha({ novaSenha, token: this.token });
            this.somService.sucesso();
            this.indicator()?.show(new Indication({ title: 'Prontinho!', message: 'Senha redefinida. Você já pode entrar.', severity: 'success', ttlInMs: 3000 }));
            setTimeout(() => this.router.navigateByUrl('/login'), 2000);
        } catch (erro) {
            this.somService.erro();
            const mensagem = erro instanceof AuthError && erro.code === 'INVALID_TOKEN'
                ? 'Esse link expirou ou já foi usado. Peça um novo.'
                : 'Não foi possível redefinir a senha.';
            this.indicator()?.show(new Indication({ title: 'Ops!', message: mensagem, severity: 'danger', ttlInMs: 4000 }));
        }
    }
}
