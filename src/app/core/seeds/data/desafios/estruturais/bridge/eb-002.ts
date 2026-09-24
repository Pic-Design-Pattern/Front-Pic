import { EncontreBug } from "../../../../../models/desafios/encontre-bug/encontre-bug";
import { PerguntaBug } from "../../../../../models/desafios/encontre-bug/pergunta-bug";
import { RespostaBug } from "../../../../../models/desafios/encontre-bug/resposta-bug";
import { Arquivo } from "../../../../../models/desafios/encontre-bug/arquivo";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_EB_BRIDGE_002 = new EncontreBug({
    id: "eb-bridge-002",
    dificuldade: Dificuldade.Dificil,
    grupo: "Estruturais",
    nivel: 3,
    padrao: "Bridge",
    perguntas: [
        new PerguntaBug({
            id: "pb1",
            enunciado: "Ao adicionar um terceiro dispositivo, o time criou uma nova classe pra cada combinação com os controles existentes. O que isso indica sobre o design?",
            explicacao: "Criar ControleBasicoAquecedor e ControleAvancadoAquecedor para o novo dispositivo é sintoma de que a ponte (composição entre ControleRemoto e Dispositivo) foi abandonada em algum lugar — no Bridge corretamente aplicado, um dispositivo novo só precisa implementar a interface Dispositivo; nenhuma classe nova de controle deveria ser necessária.",
            respostas: [
                new RespostaBug({ id: "pb1-r1", texto: "É o comportamento esperado — cada dispositivo novo sempre exige novas classes de controle." }),
                new RespostaBug({ id: "pb1-r2", texto: "Indica que a ponte por composição foi abandonada em algum lugar do código — um Bridge correto não precisaria de classes novas de controle para um dispositivo novo.", correta: true }),
                new RespostaBug({ id: "pb1-r3", texto: "Indica que Dispositivo deveria ser uma classe abstrata em vez de interface." }),
                new RespostaBug({ id: "pb1-r4", texto: "Indica que ControleRemoto deveria ser \"final\"." }),
            ],
            arquivos: [
                new Arquivo({
                    id: "pb1-a1",
                    nome: "ControleBasicoAquecedor.java",
                    linguagem: "java",
                    codigo:
`public class ControleBasicoAquecedor {
    private final AquecedorApiario aquecedor = new AquecedorApiario();

    public void ligar() {
        aquecedor.ligar();
    }
}`
                }),
                new Arquivo({
                    id: "pb1-a2",
                    nome: "ControleAvancadoAquecedor.java",
                    linguagem: "java",
                    codigo:
`public class ControleAvancadoAquecedor {
    private final AquecedorApiario aquecedor = new AquecedorApiario();

    public void ligar() {
        aquecedor.ligar();
    }

    public void modoTurbo() {
        System.out.println("Aquecendo no máximo");
    }
}`
                }),
                new Arquivo({
                    id: "pb1-a3",
                    nome: "ControleRemoto.java",
                    linguagem: "java",
                    codigo:
`public class ControleRemoto {
    protected final Dispositivo dispositivo;

    public ControleRemoto(Dispositivo dispositivo) {
        this.dispositivo = dispositivo;
    }

    public void alternar(boolean ligado) {
        if (ligado) dispositivo.ligar(); else dispositivo.desligar();
    }
}`
                }),
            ]
        }),
        new PerguntaBug({
            id: "pb2",
            enunciado: "Esse método funciona, mas quebra a garantia do Bridge assim que um dispositivo novo aparece. Qual é o problema?",
            explicacao: "descrever() usa \"instanceof\" pra descobrir o tipo concreto do Dispositivo — isso faz a Abstraction conhecer cada ConcreteImplementor pelo nome, quebrando o desacoplamento que o Bridge existe pra garantir. Todo dispositivo novo (ex.: AquecedorApiario) exige voltar em ControleRemoto e adicionar mais um \"else if\" — exatamente o tipo de mudança que o Bridge deveria evitar.",
            respostas: [
                new RespostaBug({ id: "pb2-r1", texto: "descrever() usa \"instanceof\" pra identificar o tipo concreto do Dispositivo, obrigando ControleRemoto a conhecer e ser alterado a cada dispositivo novo.", correta: true }),
                new RespostaBug({ id: "pb2-r2", texto: "O construtor de ControleRemoto deveria receber dois parâmetros." }),
                new RespostaBug({ id: "pb2-r3", texto: "\"dispositivo\" deveria ser público em vez de \"protected\"." }),
                new RespostaBug({ id: "pb2-r4", texto: "alternar() deveria usar \"instanceof\" também." }),
            ],
            arquivos: [
                new Arquivo({
                    id: "pb2-a1",
                    nome: "ControleRemoto.java",
                    linguagem: "java",
                    codigo:
`public class ControleRemoto {
    protected final Dispositivo dispositivo;

    public ControleRemoto(Dispositivo dispositivo) {
        this.dispositivo = dispositivo;
    }

    public void alternar(boolean ligado) {
        if (ligado) dispositivo.ligar(); else dispositivo.desligar();
    }

    public String descrever() {
        if (dispositivo instanceof LuzApiario) {
            return "Controlando uma luz";
        } else if (dispositivo instanceof VentiladorApiario) {
            return "Controlando um ventilador";
        }
        return "Dispositivo desconhecido";
    }
}`
                }),
            ]
        }),
    ]
});
