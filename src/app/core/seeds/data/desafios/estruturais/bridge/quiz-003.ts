import { Quiz } from "../../../../../models/desafios/quiz/quiz";
import { Pergunta } from "../../../../../models/desafios/quiz/pergunta";
import { Resposta } from "../../../../../models/desafios/quiz/resposta";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";
import { TipoDesafio } from "../../../../../models/desafios/tipo-desafio";

export const DESAFIO_QUIZ_BRIDGE_003 = new Quiz({
    id: "quiz-bridge-003",
    dificuldade: Dificuldade.Dificil,
    padrao: "Bridge",
    grupo: "Estruturais",
    nivel: 3,
    tipo: TipoDesafio.PerguntasRespostas,
    perguntas: [
        new Pergunta({
            id: "p1",
            texto: "Ao adicionar um novo ConcreteImplementor (ex.: um novo tipo de dispositivo), o que precisa mudar na hierarquia de Abstraction?",
            repostas: [
                new Resposta({ id: "p1r1", texto: "Nada — a Abstraction continua funcionando sem alterações, já que só depende da interface Implementor.", correta: true }),
                new Resposta({ id: "p1r2", texto: "Toda subclasse de Abstraction precisa ser reescrita." }),
                new Resposta({ id: "p1r3", texto: "É preciso criar uma nova Abstraction para cada Implementor." }),
                new Resposta({ id: "p1r4", texto: "A interface Implementor precisa ser duplicada." }),
            ]
        }),
        new Pergunta({
            id: "p2",
            texto: "Qual é a principal diferença de intenção entre Bridge e Strategy, já que os dois usam composição de forma parecida?",
            repostas: [
                new Resposta({ id: "p2r1", texto: "Bridge separa duas hierarquias que evoluem juntas por design; Strategy troca um algoritmo isolado, geralmente sem uma segunda hierarquia de abstração por trás.", correta: true }),
                new Resposta({ id: "p2r2", texto: "Strategy só funciona com classes finais; Bridge não." }),
                new Resposta({ id: "p2r3", texto: "Bridge não permite trocar a implementação em tempo de execução; Strategy sim." }),
                new Resposta({ id: "p2r4", texto: "Não há diferença — são o mesmo padrão com nomes diferentes." }),
            ]
        }),
        new Pergunta({
            id: "p3",
            texto: "Um exemplo clássico de Bridge no mundo real é um driver de banco de dados (ex.: JDBC). O que representa o Implementor nesse cenário?",
            repostas: [
                new Resposta({ id: "p3r1", texto: "O driver específico de cada banco (PostgreSQL, MySQL...), que implementa a comunicação real com aquele banco.", correta: true }),
                new Resposta({ id: "p3r2", texto: "A query SQL escrita pelo desenvolvedor." }),
                new Resposta({ id: "p3r3", texto: "A classe Connection usada pelo código cliente." }),
                new Resposta({ id: "p3r4", texto: "O resultado retornado pela consulta." }),
            ]
        }),
        new Pergunta({
            id: "p4",
            texto: "Em qual categoria do catálogo GoF o Bridge se encaixa?",
            repostas: [
                new Resposta({ id: "p4r1", texto: "Criacional." }),
                new Resposta({ id: "p4r2", texto: "Estrutural.", correta: true }),
                new Resposta({ id: "p4r3", texto: "Comportamental." }),
                new Resposta({ id: "p4r4", texto: "Concorrência." }),
            ]
        }),
    ]
});
