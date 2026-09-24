import { Component } from "@angular/core";
import { TextComponent } from "../../ui/typography/text.component";
import { LinkComponent } from "../../ui/typography/link.component";
import { IconComponent } from "../../ui/icon/icon.component";
import { TitleComponent } from "../../ui/typography/title.component";
import { BeeCardContentComponent, BeeCardHeaderComponent, BeeCardComponent } from "../../ui/card/card.component";

@Component({
    selector: 'bee-verificar-email',
    template: `
    <bee-card class="w-fit max-w-full">
        <bee-card-header>
            /verificar_email
        </bee-card-header>
        <bee-card-content class="flex items-center justify-center">
            <div class="w-full max-w-full md:max-w-xl flex justify-center flex-col items-center gap-4 text-center">
                <bee-icon icon="mail" [width]="48" />
                <bee-title>Confirme seu e-mail</bee-title>
                <bee-text>
                    Enviamos um link de confirmação para o seu e-mail. Clique nele para ativar sua conta e poder entrar.
                </bee-text>

                <hr class="w-full">

                <bee-link href="/login" class="text-amber-600!">Voltar para o login</bee-link>
            </div>
        </bee-card-content>
    </bee-card>

    <img src="/login-image.png" class="hidden md:block w-1/2" alt="">
    `,
    host: {
        class: 'min-h-screen w-screen flex flex-col md:flex-row gap-6 md:gap-16 items-center justify-center pattern-background p-4 overflow-y-auto'
    },
    imports: [TextComponent, LinkComponent, IconComponent, TitleComponent, BeeCardContentComponent, BeeCardHeaderComponent, BeeCardComponent]
})
export class VerificarEmailComponent { }
