import { Quiz } from "../../../../../models/desafios/quiz/quiz";
import { Pergunta } from "../../../../../models/desafios/quiz/pergunta";
import { Resposta } from "../../../../../models/desafios/quiz/resposta";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";
import { TipoDesafio } from "../../../../../models/desafios/tipo-desafio";

export const DESAFIO_QUIZ_BRIDGE_002 = new Quiz({
    id: "quiz-bridge-002",
    dificuldade: Dificuldade.Dificil,
    padrao: "Bridge",
    grupo: "Estruturais",
    nivel: 3,
    tipo: TipoDesafio.PerguntasRespostas,
    perguntas: [
        new Pergunta({
            id: "p1",
            texto: "Qual é a principal diferença de intenção entre Bridge e Adapter?",
            repostas: [
                new Resposta({ id: "p1r1", texto: "Bridge é planejado desde o design para permitir duas hierarquias variarem independentemente; Adapter é aplicado depois, para compatibilizar uma interface já existente.", correta: true }),
                new Resposta({ id: "p1r2", texto: "Adapter só funciona com classes finais; Bridge não." }),
                new Resposta({ id: "p1r3", texto: "Não há diferença real entre os dois padrões." }),
                new Resposta({ id: "p1r4", texto: "Bridge exige herança múltipla; Adapter não." }),
            ]
        }),
        new Pergunta({
            id: "p2",
            texto: "Com 3 tipos de Abstraction e 4 tipos de Implementor, quantas classes o Bridge precisa, no total, comparado à abordagem sem Bridge?",
            repostas: [
                new Resposta({ id: "p2r1", texto: "Bridge: 3 + 4 = 7 classes. Sem Bridge: até 3 × 4 = 12 classes.", correta: true }),
                new Resposta({ id: "p2r2", texto: "As duas abordagens sempre resultam no mesmo número de classes." }),
                new Resposta({ id: "p2r3", texto: "Bridge sempre precisa de mais classes do que a abordagem sem Bridge." }),
                new Resposta({ id: "p2r4", texto: "Bridge elimina a necessidade de qualquer classe de Implementor." }),
            ]
        }),
        new Pergunta({
            id: "p3",
            texto: "Qual sinal no código indica que a ponte (composição) foi abandonada em algum lugar do design?",
            repostas: [
                new Resposta({ id: "p3r1", texto: "Um dispositivo novo exige criar novas classes de controle para cada combinação existente.", correta: true }),
                new Resposta({ id: "p3r2", texto: "A interface Implementor ter mais de um método." }),
                new Resposta({ id: "p3r3", texto: "A Abstraction ser uma classe abstrata em vez de concreta." }),
                new Resposta({ id: "p3r4", texto: "O uso de \"protected\" no campo que guarda o Implementor." }),
            ]
        }),
        new Pergunta({
            id: "p4",
            texto: "Quando faz mais sentido EVITAR o padrão Bridge?",
            repostas: [
                new Resposta({ id: "p4r1", texto: "Quando existem várias implementações conhecidas desde o início do design." }),
                new Resposta({ id: "p4r2", texto: "Quando só existe uma implementação e não há indício de que outra vá surgir.", correta: true }),
                new Resposta({ id: "p4r3", texto: "Quando é necessário trocar a implementação em tempo de execução." }),
                new Resposta({ id: "p4r4", texto: "Quando a Abstraction precisa ser publicada sem expor a implementação." }),
            ]
        }),
    ]
});
