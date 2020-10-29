import React from "react";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {atual: "0", antigo: "", memoria:[], topo:""};
    

    this.numero = this.numero.bind(this);
    this.limpar = this.limpar.bind(this);
    this.apagar = this.apagar.bind(this);
    this.virgula = this.virgula.bind(this);
    this.operador = this.operador.bind(this);
    this.igual = this.igual.bind(this);
    this.limparmem = this.limparmem.bind(this);
    this.ultmem = this.ultmem.bind(this);
    this.somamem = this.somamem.bind(this);
    this.salvamem = this.salvamem.bind(this);
    this.recmem = this.recmem.bind(this);
    this.apagamem = this.apagamem.bind(this);

    }


    numero(num) {
        this.setState(state =>{
            return {
                atual: state.atual.includes(",")
                ? state.atual+num
                : formatar(state.atual+num),
            };
        });
    }

    limpar() {
        this.setState(state =>{
            return {
                atual: "0",
                antigo: "",
            };
        });
    }

    apagar() {
        this.setState(state =>{
            return {
                atual: state.atual.slice(0,-1) === ""
                ? "0"
                : formatar(state.atual.slice(0,-1)),
            };
        });
    }

    virgula() {
        this.setState(state =>{
            return {
                atual: state.atual.includes(",")
                ? state.atual
                : state.atual + ",",
            };
        });
    }

    operador(sinal) {
        if (this.state.antigo === "") {
            this.setState(state =>{
                return {
                    antigo: state.atual + " " + sinal,
                    atual: "0",
                };
            });
        }
        else {
            this.setState(state =>{
                return {
                    antigo: state.antigo,
                };
            });
        }
    }

    igual() {
        if (this.state.antigo === "") {
            return;
        }
        else {
            let n1 = this.state.antigo.split(" ")[0];
            let sig = this.state.antigo.split(" ")[1];
            let n2 = this.state.atual;
            let res = eval((n1.replaceAll(".", "")).replaceAll(",",".")+sig+(n2.replaceAll(".", "")).replaceAll(",", ".")).toString();
            this.setState(state =>{
                return{
                    atual: formatar(res.replaceAll(".", ",")),
                    antigo: "",
                };
            });
        }
    }

    limparmem() {
        this.setState(state =>{
            return{
                memoria: [],
                topo: "",
            };
        });
    }

    ultmem() {
        this.setState(state =>{
            return{
                atual: state.topo,
            };
        });
    }

    somamem() {
        if (this.state.memoria === []) {
            return;
        }
        else {
            let n1 = this.state.atual;
            let n2 = this.state.topo;
            let res = eval((n1.replaceAll(".", "")).replaceAll(",",".")+"+"+(n2.replaceAll(".", "")).replaceAll(",", ".")).toString();
            let resf = formatar(res.replaceAll(".", ","));
            let elemento = new Valmem(resf);
            let memoria = [...this.state.memoria];
            memoria.pop();
            memoria.push(elemento);
            this.setState(state =>{
                return{
                    topo: resf,
                    memoria,
                };
            });
        }
    }

    salvamem() {
        let elemento = new Valmem(this.state.atual);
        let memoria = [...this.state.memoria];
        memoria.push(elemento);
        this.setState(state =>{
            return{
                memoria,
                topo: state.atual,
            };
        });
    }

    recmem(val) {
        this.setState(state =>{
            return{
                atual: val,
            };
        });
    }

    apagamem(val) {
        this.setState(state =>{
            return{
                memoria: state.memoria.filter(x => x.val !== val),
            };
        });
    }

    render() {
        const {atual, antigo, memoria} = this.state;
        return (
            <div className="App">
                <header>
                    <h1>Lucalculadora</h1>
                </header>
                <div className="corpo">
                    <div className="processos">
                        <span className="tela">
                            <div className="mostra-antigo">{antigo}</div>
                            <div className="mostra-atual">{atual}</div>
                        </span>
                        <div className="butts">
                            <Botnum id="zero" onClick={() => this.numero("0")}>
                                0
                            </Botnum>
                            <Botnum id="un" onClick={() => this.numero("1")}>
                                1
                            </Botnum>
                            <Botnum id="deux" onClick={() => this.numero("2")}>
                                2
                            </Botnum>
                            <Botnum id="trois" onClick={() => this.numero("3")}>
                                3
                            </Botnum>
                            <Botnum id="quatre" onClick={() => this.numero("4")}>
                                4
                            </Botnum>
                            <Botnum id="cinq" onClick={() => this.numero("5")}>
                                5
                            </Botnum>
                            <Botnum id="six" onClick={() => this.numero("6")}>
                                6
                            </Botnum>
                            <Botnum id="sept" onClick={() => this.numero("7")}>
                                7
                            </Botnum>
                            <Botnum id="huit" onClick={() => this.numero("8")}>
                                8
                            </Botnum>
                            <Botnum id="neuf" onClick={() => this.numero("9")}>
                                9
                            </Botnum>
                            <Botlim id="limpar" onClick={() => this.limpar()}>
                                CE
                            </Botlim>
                            <Botapa id="apagar" onClick={() => this.apagar()}>
                                DEL
                            </Botapa>
                            <Botvir id="virgula" onClick={() => this.virgula()}>
                                ,
                            </Botvir>
                            <Botope id="soma" onClick={() => this.operador("+")}>
                                +
                            </Botope>
                            <Botope id="subtracao" onClick={() => this.operador("-")}>
                                -
                            </Botope>
                            <Botope id="multiplicacao" onClick={() => this.operador("*")}>
                                *
                            </Botope>
                            <Botope id="divisao" onClick={() => this.operador("/")}>
                                /
                            </Botope>
                            <Botigu id="igual" onClick={() => this.igual()}>
                                =
                            </Botigu>
                            <BotlimM id="lim" onClick={() => this.limparmem()}>
                                MC
                            </BotlimM>
                            <BotultM id="ult" onClick={() => this.ultmem()}>
                                MR
                            </BotultM>
                            <BotsomM id="som" onClick={() => this.somamem()}>
                                M+
                            </BotsomM>
                            <BotsalM id="sal" onClick={() => this.salvamem()}>
                                MS
                            </BotsalM>
                        </div>
                    </div>
                    <div className="armazenamento">
                        <h2>Armazenamento</h2>
                        <MostraMemoria memoria={memoria} recmem={this.recmem} apagamem={this.apagamem}></MostraMemoria>
                    </div>
                </div>
            </div>
        );

    }

}

function Botao(props) {
    const {onClick, className, children, id} = props;
    return(
        <button onClick={onClick} className={className} id={id}>
            {children}
        </button>
    );
}

function Botnum(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-num" id={id}>
            {children}
        </Botao>
    );
}

function Botlim(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-lim" id={id}>
            {children}
        </Botao>
    );
}

function Botapa(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-apa" id={id}>
            {children}
        </Botao>
    );
}

function Botvir(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-vir" id={id}>
            {children}
        </Botao>
    );
}

function Botope(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-ope" id={id}>
            {children}
        </Botao>
    );
}

function Botigu(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-igu" id={id}>
            {children}
        </Botao>
    );
}

function BotlimM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-limM" id={id}>
            {children}
        </Botao>
    );
}

function BotultM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-ultM" id={id}>
            {children}
        </Botao>
    );
}

function BotsomM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-somM" id={id}>
            {children}
        </Botao>
    );
}

function BotsalM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-salM" id={id}>
            {children}
        </Botao>
    );
}

function BotrecM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-recM" id={id}>
            {children}
        </Botao>
    );
}

function BotapaM(props) {
    const {onClick, children, id} = props;
    return(
        <Botao onClick={onClick} className="b-apaM" id={id}>
            {children}
        </Botao>
    );
}

function formatar(num) {
    let saida=parseFloat((num.replaceAll(".", "")).replaceAll(",", "."));
    saida=Intl.NumberFormat("pt-BR", {maximumFractionDigits:9}).format(saida);
    return saida;
}

function Valmem(val) {
    this.val = val;
}

function MostraMemoria(props) {
    const {memoria, recmem, apagamem} = props;
    return(
        <table className="tabela">
            <tbody>
                {memoria.map(x =>{
                    return(
                        <tr key={x.val}>
                            <td className="tabela-display">{x.val}</td>
                            <td>
                                <BotrecM onClick={() => recmem(x.val)}><b>MR</b></BotrecM>
                            </td>
                            <td>
                                <BotapaM onClick={() => apagamem(x.val)}><b>MS</b></BotapaM>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default App;