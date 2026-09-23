import { Quiz } from "../../../../../models/desafios/quiz/quiz";
import { Pergunta } from "../../../../../models/desafios/quiz/pergunta";
import { Resposta } from "../../../../../models/desafios/quiz/resposta";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";
import { TipoDesafio } from "../../../../../models/desafios/tipo-desafio";

export const DESAFIO_QUIZ_BRIDGE_001 = new Quiz({
    id: "quiz-bridge-001",
    dificuldade: Dificuldade.Facil,
    padrao: "Bridge",
    grupo: "Estruturais",
    nivel: 1,
    tipo: TipoDesafio.PerguntasRespostas,
    perguntas: [
        new Pergunta({
            id: "p1",
            texto: "Qual das afirmações abaixo descreve melhor o padrão Bridge?",
            repostas: [
                new Resposta({ id: "p1r1", texto: "Converte a interface de uma classe existente na interface esperada pelo cliente." }),
                new Resposta({ id: "p1r2", texto: "Separa uma abstração da sua implementação, para que as duas possam variar de forma independente.", correta: true }),
                new Resposta({ id: "p1r3", texto: "Garante que uma classe tenha apenas uma instância." }),
                new Resposta({ id: "p1r4", texto: "Define uma sequência de passos para construir um objeto complexo." }),
            ]
        }),
        new Pergunta({
            id: "p2",
            texto: "Qual problema o Bridge evita ao separar as duas hierarquias?",
            repostas: [
                new Resposta({ id: "p2r1", texto: "A explosão combinatória de classes (uma classe para cada combinação de abstração × implementação).", correta: true }),
                new Resposta({ id: "p2r2", texto: "A necessidade de usar interfaces em qualquer parte do código." }),
                new Resposta({ id: "p2r3", texto: "O uso de herança em qualquer situação." }),
                new Resposta({ id: "p2r4", texto: "A necessidade de testar o código." }),
            ]
        }),
        new Pergunta({
            id: "p3",
            texto: "Como a Abstraction se conecta ao Implementor no padrão Bridge?",
            repostas: [
                new Resposta({ id: "p3r1", texto: "Por herança múltipla das duas classes." }),
                new Resposta({ id: "p3r2", texto: "Por composição: a Abstraction guarda uma referência ao Implementor e delega chamadas para ele.", correta: true }),
                new Resposta({ id: "p3r3", texto: "Por meio de um método estático compartilhado." }),
                new Resposta({ id: "p3r4", texto: "Elas não se conectam — são totalmente independentes." }),
            ]
        }),
        new Pergunta({
            id: "p4",
            texto: "No exemplo do controle remoto e dos dispositivos do apiário, o que representa o \"Implementor\"?",
            repostas: [
                new Resposta({ id: "p4r1", texto: "A interface Dispositivo e suas implementações concretas (LuzApiario, VentiladorApiario).", correta: true }),
                new Resposta({ id: "p4r2", texto: "A classe ControleRemoto." }),
                new Resposta({ id: "p4r3", texto: "O método main() da aplicação." }),
                new Resposta({ id: "p4r4", texto: "A classe ControleRemotoAvancado." }),
            ]
        }),
    ]
});
