import { EncontrePares } from "../../../../../models/desafios/encontre-pares/encontre-pares";
import { Rodada } from "../../../../../models/desafios/encontre-pares/rodada";
import { Par } from "../../../../../models/desafios/encontre-pares/par";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_EP_BRIDGE_001 = new EncontrePares({
    id: "ep-bridge-001",
    dificuldade: Dificuldade.Medio,
    grupo: "Estruturais",
    nivel: 2,
    padrao: "Bridge",
    rodadas: [
        new Rodada({
            id: "r1",
            pares: [
                new Par({ id: "r1p1", afirmacao: "Abstraction (ControleRemoto)", correspondencia: "Guarda uma referência ao Implementor e delega as chamadas pra ele." }),
                new Par({ id: "r1p2", afirmacao: "Implementor (Dispositivo)", correspondencia: "Interface que declara as operações básicas, implementadas de um jeito por cada dispositivo concreto." }),
                new Par({ id: "r1p3", afirmacao: "Composição", correspondencia: "A forma como a Abstraction se conecta ao Implementor no Bridge — guardando uma referência, não herdando dela." }),
                new Par({ id: "r1p4", afirmacao: "Explosão combinatória de classes", correspondencia: "O problema que o Bridge evita: sem ele, cada combinação de controle e dispositivo viraria uma classe nova." }),
            ]
        }),
        new Rodada({
            id: "r2",
            pares: [
                new Par({ id: "r2p1", afirmacao: "ControleRemoto", correspondencia: "Guarda a referência a um Dispositivo e expõe alternar(), sem saber qual dispositivo concreto está por trás." }),
                new Par({ id: "r2p2", afirmacao: "LuzApiario / VentiladorApiario", correspondencia: "Implementações concretas de Dispositivo, cada uma ligando e desligando do seu próprio jeito." }),
                new Par({ id: "r2p3", afirmacao: "ControleRemotoAvancado", correspondencia: "Subclasse da Abstraction que adiciona funcionalidades extras, sem precisar conhecer o dispositivo concreto." }),
                new Par({ id: "r2p4", afirmacao: "Sem o Bridge", correspondencia: "Cada combinação de controle e dispositivo exigiria sua própria classe, multiplicando o total à medida que qualquer um dos dois lados cresce." }),
            ]
        }),
    ]
});
