import { CompleteTexto } from "../../../../../models/desafios/complete-texto/complete-texto";
import { Texto } from "../../../../../models/desafios/complete-texto/texto";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_CT_BRIDGE_002 = new CompleteTexto({
    id: "ct-bridge-002",
    dificuldade: Dificuldade.Medio,
    grupo: "Estruturais",
    nivel: 2,
    padrao: "Bridge",
    textos: [
        new Texto({
            id: "t1",
            texto: "No Bridge, a {{1}} guarda uma referência ao {{2}} e delega as chamadas pra ele — é essa composição que forma a \"ponte\" entre as duas hierarquias.",
            opcoes: ["Abstraction", "Implementor", "RefinedAbstraction", "ConcreteImplementor", "interface gráfica", "fábrica"],
            respostas: ["Abstraction", "Implementor"]
        }),
        new Texto({
            id: "t2",
            texto: "A {{1}} estende a Abstraction com funcionalidades extras, sem precisar saber qual {{2}} concreto está por trás.",
            opcoes: ["RefinedAbstraction", "ConcreteImplementor", "Abstraction", "Implementor", "Adapter", "Decorator"],
            respostas: ["RefinedAbstraction", "ConcreteImplementor"]
        }),
        new Texto({
            id: "t3",
            texto: "O Bridge separa duas hierarquias — a de {{1}} e a de {{2}} — ligadas por uma única seta de {{3}} entre elas.",
            opcoes: ["abstração", "implementação", "composição", "herança", "delegação dupla", "generalização"],
            respostas: ["abstração", "implementação", "composição"]
        }),
    ]
});
