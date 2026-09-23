import { AcaoDoMapa } from "../../../../models/map/acao-do-mapa";
import { Mapa } from "../../../../models/map/mapa";
import { TipoAcao } from "../../../../models/map/tipo-acao";
import { TipoMapa } from "../../../../models/map/tipo-mapa";
import { ID_MAPA_INICIAL } from "../mapa-mundi";

export const CONTINENTE_ESTRUTURAL = new Mapa({
    id: "continental-estrutural",
    nome: "Continente Estrutural",
    tipo: TipoMapa.Continental,
    padrao: "Estrutural",
    url: "maps/continentes/estrutural.gif",
    tamanhoEmPx: {
        x: 608,
        y: 448
    },
    acoes: [
        new AcaoDoMapa({
            id: "ces-onibus-reg-adapter",
            titulo: "Adapter",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "adapter",
            posicaoEmPx: { x: 368, y: 176 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-bridge",
            titulo: "Bridge",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "bridge",
            posicaoEmPx: { x: 192, y: 224 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-composite",
            titulo: "Composite",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "composite",
            posicaoEmPx: { x: 336, y: 96 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-decorator",
            titulo: "Decorator",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "decorator",
            posicaoEmPx: { x: 304, y: 256 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-facade",
            titulo: "Facade",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "facade",
            posicaoEmPx: { x: 416, y: 256 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-flyweight",
            titulo: "Flyweight",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "flyweight",
            posicaoEmPx: { x: 256, y: 144 },
            mostrarLabel: true
        }),
        new AcaoDoMapa({
            id: "ces-onibus-reg-proxy",
            titulo: "Proxy",
            tipo: TipoAcao.Onibus,
            mapaDestinoId: "proxy",
            posicaoEmPx: { x: 208, y: 304 },
            mostrarLabel: true
        }),

        new AcaoDoMapa({
            id: "ces-aviao-mundi",
            titulo: "Voltar",
            tipo: TipoAcao.Aviao,
            mapaDestinoId: ID_MAPA_INICIAL,
            posicaoEmPx: { x: 96, y: 128 },
            mostrarLabel: true
        })
    ]
});
