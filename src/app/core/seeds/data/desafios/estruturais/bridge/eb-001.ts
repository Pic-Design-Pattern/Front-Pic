import { EncontreBug } from "../../../../../models/desafios/encontre-bug/encontre-bug";
import { PerguntaBug } from "../../../../../models/desafios/encontre-bug/pergunta-bug";
import { RespostaBug } from "../../../../../models/desafios/encontre-bug/resposta-bug";
import { Arquivo } from "../../../../../models/desafios/encontre-bug/arquivo";
import { Dificuldade } from "../../../../../models/desafios/dificuldade";

export const DESAFIO_EB_BRIDGE_001 = new EncontreBug({
    id: "eb-bridge-001",
    dificuldade: Dificuldade.Medio,
    grupo: "Estruturais",
    nivel: 2,
    padrao: "Bridge",
    perguntas: [
        new PerguntaBug({
            id: "pb1",
            enunciado: "O ControleRemotoAvancado nunca liga o ventilador de verdade, mesmo chamando alternar(true). Qual é o problema?",
            explicacao: "modoEconomico() cria um NOVO objeto Dispositivo (\"new VentiladorApiario()\") em vez de usar o \"dispositivo\" já recebido no construtor — então quando alternar() é chamado depois, ele delega para o dispositivo original (que nunca teve modoEconomico aplicado), não para essa instância nova e descartada.",
            respostas: [
                new RespostaBug({ id: "pb1-r1", texto: "A interface Dispositivo está incompleta." }),
                new RespostaBug({ id: "pb1-r2", texto: "modoEconomico() cria uma nova instância de Dispositivo em vez de usar a referência já guardada em \"dispositivo\".", correta: true }),
                new RespostaBug({ id: "pb1-r3", texto: "ControleRemotoAvancado deveria implementar Dispositivo diretamente." }),
                new RespostaBug({ id: "pb1-r4", texto: "O construtor de ControleRemoto está com visibilidade errada." }),
            ],
            arquivos: [
                new Arquivo({
                    id: "pb1-a1",
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
                new Arquivo({
                    id: "pb1-a2",
                    nome: "ControleRemotoAvancado.java",
                    linguagem: "java",
                    codigo:
`public class ControleRemotoAvancado extends ControleRemoto {
    public ControleRemotoAvancado(Dispositivo dispositivo) {
        super(dispositivo);
    }

    public void modoEconomico() {
        Dispositivo economico = new VentiladorApiario();
        economico.ligar();
    }
}`
                }),
                new Arquivo({
                    id: "pb1-a3",
                    nome: "App.java",
                    linguagem: "java",
                    codigo:
`public class App {
    public static void main(String[] args) {
        ControleRemotoAvancado controle = new ControleRemotoAvancado(new VentiladorApiario());
        controle.modoEconomico();
        controle.alternar(true);
    }
}`
                }),
            ]
        }),
        new PerguntaBug({
            id: "pb2",
            enunciado: "Depois de chamar controle.alternar(true), luz.estaLigada() ainda retorna false. Qual é o problema?",
            explicacao: "ligar() imprime a mensagem mas nunca atualiza o campo \"ligada\" para true — a ponte está funcionando certinho (ControleRemoto delega corretamente para luz.ligar()); o bug está dentro do próprio ConcreteImplementor, que não implementa a operação por completo.",
            respostas: [
                new RespostaBug({ id: "pb2-r1", texto: "O método ligar() de LuzApiario nunca atribui \"ligada = true\" — a implementação concreta está incompleta, não a ponte entre as classes.", correta: true }),
                new RespostaBug({ id: "pb2-r2", texto: "ControleRemoto deveria chamar dispositivo.ligar() duas vezes." }),
                new RespostaBug({ id: "pb2-r3", texto: "A interface Dispositivo deveria declarar o campo \"ligada\"." }),
                new RespostaBug({ id: "pb2-r4", texto: "alternar(true) deveria chamar desligar() em vez de ligar()." }),
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
}`
                }),
                new Arquivo({
                    id: "pb2-a2",
                    nome: "LuzApiario.java",
                    linguagem: "java",
                    codigo:
`public class LuzApiario implements Dispositivo {
    private boolean ligada;

    @Override
    public void ligar() {
        System.out.println("Tentando ligar...");
    }

    @Override
    public void desligar() {
        ligada = false;
    }

    public boolean estaLigada() {
        return ligada;
    }
}`
                }),
                new Arquivo({
                    id: "pb2-a3",
                    nome: "App.java",
                    linguagem: "java",
                    codigo:
`public class App {
    public static void main(String[] args) {
        LuzApiario luz = new LuzApiario();
        ControleRemoto controle = new ControleRemoto(luz);

        controle.alternar(true);
        System.out.println(luz.estaLigada()); // false — deveria ser true
    }
}`
                }),
            ]
        }),
    ]
});
