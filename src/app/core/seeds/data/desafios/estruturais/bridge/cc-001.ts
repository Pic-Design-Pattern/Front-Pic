import { CompleteCodigo } from "../../../../../models/desafios/complete-codigo/complete-codigo";
import { CodigoIncompleto } from "../../../../../models/desafios/complete-codigo/codigo-incompleto";
import { Trecho } from "../../../../../models/desafios/complete-codigo/trecho";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_CC_BRIDGE_001 = new CompleteCodigo({
    id: "cc-bridge-001",
    dificuldade: Dificuldade.Medio,
    grupo: "Estruturais",
    nivel: 2,
    padrao: "Bridge",
    codigos: [
        new CodigoIncompleto({
            id: "cc1",
            arquivo: "ControleRemotoVoz.java",
            linguagem: "java",
            respostaCorretaId: "cc1-t1",
            explicacao: "ControleRemotoVoz é uma RefinedAbstraction nova — ela só precisa chamar super(dispositivo) pra passar a referência pra cima, reaproveitando o campo já guardado por ControleRemoto. Não é preciso (nem deve) redeclarar o campo \"dispositivo\" de novo, nem tocar em nenhum ConcreteImplementor existente.",
            template:
`public class ControleRemotoVoz extends ControleRemoto {
{{1}}

    public void comandoDeVoz(String comando) {
        if (comando.equals("ligar")) alternar(true);
        else if (comando.equals("desligar")) alternar(false);
    }
}`,
            opcoes: [
                new Trecho({ id: "cc1-t1", codigo: `    public ControleRemotoVoz(Dispositivo dispositivo) {\n        super(dispositivo);\n    }` }),
                new Trecho({ id: "cc1-t2", codigo: `    public ControleRemotoVoz() {\n        super(null);\n    }` }),
                new Trecho({ id: "cc1-t3", codigo: `    private Dispositivo dispositivo;\n\n    public ControleRemotoVoz(Dispositivo dispositivo) {\n        this.dispositivo = dispositivo;\n    }` }),
                new Trecho({ id: "cc1-t4", codigo: `    public ControleRemotoVoz(Dispositivo dispositivo) {\n    }` }),
            ]
        }),
        new CodigoIncompleto({
            id: "cc2",
            arquivo: "PortaoApiario.java",
            linguagem: "java",
            respostaCorretaId: "cc2-t1",
            explicacao: "PortaoApiario é um ConcreteImplementor novo — só precisa implementar ligar() e desligar() da interface Dispositivo. Nenhuma classe de ControleRemoto precisa mudar pra ele funcionar; é exatamente essa independência entre as duas hierarquias que o Bridge garante.",
            template:
`public class PortaoApiario implements Dispositivo {
    private boolean aberto = false;

{{1}}

    @Override
    public void desligar() {
        aberto = false;
        System.out.println("Portão fechado");
    }
}`,
            opcoes: [
                new Trecho({ id: "cc2-t1", codigo: `    @Override\n    public void ligar() {\n        aberto = true;\n        System.out.println("Portão aberto");\n    }` }),
                new Trecho({ id: "cc2-t2", codigo: `    public void abrir() {\n        aberto = true;\n    }` }),
                new Trecho({ id: "cc2-t3", codigo: `    private void ligar() {\n        aberto = true;\n    }` }),
                new Trecho({ id: "cc2-t4", codigo: `    @Override\n    public void iniciar() {\n        aberto = true;\n    }` }),
            ]
        }),
    ]
});
