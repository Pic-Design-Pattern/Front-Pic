import { Component, inject, signal, viewChild } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { AuthService } from "../core/auth/auth.service";

@Component({
    selector: 'bee-esqueci-senha',
    template: `
    <bee-card class="w-fit max-w-full">
        <bee-card-header>
            /esqueci_senha
            <a bee-button size="small" href="/login">
                Voltar
                <bee-icon icon="external-link" />
            </a>
        </bee-card-header>
        <bee-card-content class="flex items-center justify-center">
            <form class="w-full max-w-full md:max-w-xl flex justify-center flex-col gap-4" [formGroup]="form" (ngSubmit)="onSubmit()">
                <bee-title> Esqueceu sua senha? </bee-title>
                <bee-text>Digite seu e-mail e enviaremos um link para redefinir sua senha.</bee-text>

                <bee-field>
                    <label bee-label for="input-email">Email</label>
                    <input type="email" bee-input id="input-email" formControlName="email" />
                </bee-field>

                <bee-indicator class="w-full!" #indicator />

                <button fluid bee-button type="submit" [disabled]="form.invalid || authService.solicitando() || enviado()">
                    <bee-icon icon="mail" />
                    Enviar link
                </button>

                <hr>

                <div class="w-full flex flex-row items-center justify-center gap-2">
                    <bee-text>Lembrou a senha? </bee-text>
                    <bee-link href="/login" class="text-amber-600!">Entrar</bee-link>
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
export class EsqueciSenhaComponent {
    protected readonly authService = inject(AuthService);
    private readonly formBuilder = inject(FormBuilder);

    private readonly indicator = viewChild<IndicatorComponent>('indicator');

    protected readonly enviado = signal(false);

    protected readonly form = this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
    });

    protected async onSubmit(): Promise<void> {
        if (this.form.invalid) return;

        const { email } = this.form.getRawValue();

        try {
            await this.authService.esqueciSenha({ email, redirectTo: `${location.origin}/redefinir-senha` });
            this.enviado.set(true);
            this.indicator()?.show(new Indication({
                title: 'Prontinho!',
                message: 'Se esse e-mail existir na nossa base, enviamos um link de redefinição.',
                severity: 'success',
                ttlInMs: 5000,
            }));
        } catch {
            this.indicator()?.show(new Indication({
                title: 'Ops!',
                message: 'Não foi possível enviar o link agora. Tente novamente em instantes.',
                severity: 'danger',
                ttlInMs: 4000,
            }));
        }
    }
}
