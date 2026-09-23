import { CompleteTexto } from "../../../../../models/desafios/complete-texto/complete-texto";
import { Texto } from "../../../../../models/desafios/complete-texto/texto";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_CT_BRIDGE_001 = new CompleteTexto({
    id: "ct-bridge-001",
    dificuldade: Dificuldade.Facil,
    grupo: "Estruturais",
    nivel: 1,
    padrao: "Bridge",
    textos: [
        new Texto({
            id: "t1",
            texto: "O padrão {{1}} separa uma {{2}} da sua {{3}}, permitindo que as duas variem de forma independente.",
            opcoes: ["Bridge", "abstração", "implementação", "Adapter", "instância", "interface gráfica"],
            respostas: ["Bridge", "abstração", "implementação"]
        }),
        new Texto({
            id: "t2",
            texto: "Em vez de usar {{1}}, a Abstraction se conecta ao Implementor por {{2}}, guardando uma referência e delegando chamadas.",
            opcoes: ["herança", "composição", "reflection", "clonagem", "polimorfismo estático", "serialização"],
            respostas: ["herança", "composição"]
        }),
        new Texto({
            id: "t3",
            texto: "Sem o Bridge, criar uma classe para cada combinação de abstração e implementação causa uma {{1}} de {{2}}.",
            opcoes: ["explosão combinatória", "classes", "redução", "métodos", "simplificação", "instâncias"],
            respostas: ["explosão combinatória", "classes"]
        }),
    ]
});
