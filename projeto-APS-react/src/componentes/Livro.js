import React, { Component } from "react";
import axios from "axios";
import imgLivro, {
  divExibeLivro,
  dadosLivro,
  subtitles
} from "../styles/InformacaoLivro";
import Dialog from "react-bootstrap-dialog";
import { getCurrentData } from "../util/dateUtil";

export class Livro extends Component {
  constructor(props, match) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      id: params.id,
      idDono: params.idDono,
      nome: params.nome,
      autor: params.autor,
      categoria: params.categoria,
      edicao: params.edicao,
      emprestado: params.emprestado,
      statusLivro: params.statusLivro,
      url: params.url,
      nomeCliente: params.nomeCliente,
      showModal: false,
      listaCliente: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/livros/" + this.state.id)
      .then(resposta => {
        this.setState({ idDono: resposta.data.idDono });
        this.setState({ nome: resposta.data.nome });
        this.setState({ autor: resposta.data.autor });
        this.setState({ categoria: resposta.data.categoria });
        this.setState({ edicao: resposta.data.edicao });
        this.setState({ emprestado: resposta.data.emprestado });
        this.setState({ url: resposta.data.url });
        this.setState({ statusLivro: resposta.data.statusLivro });
        console.log(resposta);
        axios
          .get("http://localhost:3000/clientes/" + this.state.idDono)
          .then(resposta => {
            this.setState({ nomeCliente: resposta.data.nome });
            console.log(resposta);
          })
          .catch(erro => console.log(erro));
      })
      .catch(erro => console.log(erro));

    axios.get("http://localhost:3000/clientes/").then(resposta => {
      this.setState({ listaCliente: resposta.data });
    });
  }

  emprestado() {
    var { emprestado } = this.state;
    return emprestado === true ? "Sim" : "Não";
  }

  alugarLivro = () =>
    this.state.emprestado === false ? (
      <button
        type="button"
        class="btn btn btn-outline-info"
        onClick={this.modalAlugaLivro}
      >
        Alugar Livro
      </button>
    ) : (
      ""
    );

  getRandomInt = () => {
    const min = Math.ceil(1);
    const max = Math.floor(100000);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  modalAlugaLivro = () =>
    this.dialog.show({
      title: "Confirmação de Empréstimo",
      body: "Deseja confirmar o empréstimo do livro " + this.state.nome + "?",
      prompt: Dialog.TextPrompt({
        placeholder: "Insira seu ID para confirmar",
        initialValue: "",
        required: true
      }),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(dialog => {
          const result = parseInt(dialog.value);
          const id = this.state.listaCliente.filter(
            cliente => cliente.id === result
          );
          console.log(typeof result, id);
          if (
            id.length === 0 ||
            result === this.state.idDono ||
            this.state.statusLivro === "realizado"
          ) {
            this.erroLivro();
          } else {
            const novoEmprestismo = {
              id: this.getRandomInt(),
              idCliente: result,
              idDono: this.state.idDono,
              idProduto: parseInt(this.state.id),
              data: getCurrentData(),
              situacao: "realizado"
            };
            axios
              .post("http://localhost:3000/pedidoEmprestimo/", novoEmprestismo)
              .then(resposta => {
                axios
                  .put("http://localhost:3000/livros/" + this.state.id, {
                    id: this.state.id,
                    idDono: this.state.idDono,
                    nome: this.state.nome,
                    autor: this.state.autor,
                    categoria: this.state.categoria,
                    edicao: this.state.edicao,
                    emprestado: this.state.emprestado,
                    url: this.state.url,
                    statusLivro: "realizado"
                  })
                  .then(response => {
                    this.setState({ statusLivro: "realizado" });
                    this.emprestimoOk();
                  });
              })
              .catch(erro => console.log(erro));
          }
        })
      ],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });

  erroLivro = () =>
    this.dialog.show({
      title: "Erro",
      body: "A solicitação não pode ser realizada.",
      actions: [Dialog.OKAction()],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });

  emprestimoOk = () =>
    this.dialog.show({
      title: "Sucesso",
      body: "Pedido enviado com sucesso!",
      actions: [Dialog.OKAction()],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });

  render() {
    return (
      <div className="container">
        <h2>Livro {this.state.id}</h2>
        <div style={divExibeLivro}>
          <div>
            <img src={this.state.url} style={imgLivro}></img>
          </div>
          <div style={dadosLivro}>
            <p>
              <b style={subtitles}>Nome: </b>
              {this.state.nome}
            </p>
            <p>
              <b style={subtitles}>Autor: </b>
              {this.state.autor}
            </p>
            <p>
              <b style={subtitles}>Categoria: </b>
              {this.state.categoria}
            </p>
            <p>
              <b style={subtitles}>Está Emprestado? </b>
              {this.emprestado()}
            </p>
            <p>
              <b style={subtitles}>Edição </b>
              {this.state.edicao}
            </p>
            <p>
              <b style={subtitles}>Pertencente a: </b>
              <a href={`/clientes/${this.state.idDono}`}>
                {this.state.nomeCliente}
              </a>
            </p>
            <p>{this.alugarLivro()}</p>
          </div>
        </div>
        <Dialog
          ref={el => {
            this.dialog = el;
          }}
        />
      </div>
    );
  }
}

export default Livro;
