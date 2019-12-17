import React, { Component } from "react";
import axios from "axios";
import {
  imgPerfil,
  divExibeLivro,
  dadosLivro,
  subtitles
} from "../styles/InformacaoLivro";
import imgLivro from "../styles/ListaLivros";
import Dialog from "react-bootstrap-dialog";

export class Cliente extends Component {
  constructor(props, match) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      id: params.id,
      nome: params.nome,
      cpf: params.cpf,
      cidade: params.cidade,
      estado: params.estado,
      idade: params.idade,
      email: params.email,
      url: params.url,
      listaLivros: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/clientes/" + this.state.id)
      .then(resposta => {
        this.setState({ nome: resposta.data.nome });
        this.setState({ cpf: resposta.data.cpf });
        this.setState({ cidade: resposta.data.cidade });
        this.setState({ estado: resposta.data.estado });
        this.setState({ idade: resposta.data.idade });
        this.setState({ email: resposta.data.email });
        this.setState({ url: resposta.data.url });
        console.log(resposta);
      })
      .catch(erro => console.log(erro));

    this.getListaLivros();
  }

  getListaLivros = () => {
    axios.get("http://localhost:3000/livros/").then(resposta => {
      const livrosCliente = resposta.data.filter(
        p => p.idDono == this.state.id
      );
      this.setState({ listaLivros: livrosCliente });
      console.log(livrosCliente);
    });
  };

  alteraBotao = livro => {
    if (livro.statusLivro === "realizado") {
      return (
        <button
          type="button"
          class="btn btn btn-outline-success"
          onClick={() => {
            this.confirmaEmprestimo(livro);
          }}
        >
          Confirmar Empréstimo
        </button>
      );
    }
    if (livro.statusLivro === "enviado") {
      return (
        <button
          type="button"
          class="btn btn btn-outline-danger"
          onClick={() => {
            this.confirmaDevolucao(livro);
          }}
        >
          Confirmar Devolução
        </button>
      );
    }
    return <p>Disponível para Empréstimo</p>;
  };

  confirmaEmprestimo = livro => {
    this.dialog.show({
      title: "Confirmação de Empréstimo",
      body: "Deseja confirmar o empréstimo do livro ?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          axios
            .put("http://localhost:3000/livros/" + livro.id, {
              id: livro.id,
              idDono: livro.idDono,
              nome: livro.nome,
              autor: livro.autor,
              categoria: livro.categoria,
              edicao: livro.edicao,
              emprestado: !livro.emprestado,
              url: livro.url,
              statusLivro: "enviado"
            })
            .then(response => {
              axios
                .get("http://localhost:3000/pedidoEmprestimo/")
                .then(response => {
                  console.log(response.data);

                  const listaEmprestimo = response.data.filter(
                    p => p.idProduto === livro.id && p.situacao === "realizado"
                  );
                  console.log(listaEmprestimo);
                  const pedido = listaEmprestimo[0];
                  axios
                    .put(
                      "http://localhost:3000/pedidoEmprestimo/" + pedido.id,
                      {
                        ...pedido,
                        situacao: "enviado"
                      }
                    )
                    .then(response => this.emprestimoOk());
                  this.getListaLivros();
                });
            });
        })
      ],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });
  };

  emprestimoOk = () =>
    this.dialog.show({
      title: "Sucesso",
      body: "Empréstimo efetuado com sucesso!",
      actions: [Dialog.OKAction()],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });

  confirmaDevolucao = livro => {
    this.dialog.show({
      title: "Confirmação de Devolução",
      body: "Deseja confirmar a devolução do livro ?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          axios
            .put("http://localhost:3000/livros/" + livro.id, {
              id: livro.id,
              idDono: livro.idDono,
              nome: livro.nome,
              autor: livro.autor,
              categoria: livro.categoria,
              edicao: livro.edicao,
              emprestado: !livro.emprestado,
              url: livro.url,
              statusLivro: "finalizado"
            })
            .then(response => {
              axios
                .get("http://localhost:3000/pedidoEmprestimo/")
                .then(response => {
                  console.log(response.data);

                  const listaEmprestimo = response.data.filter(
                    p => p.idProduto === livro.id && p.situacao === "enviado"
                  );
                  console.log(listaEmprestimo);
                  const pedido = listaEmprestimo[0];
                  axios
                    .put(
                      "http://localhost:3000/pedidoEmprestimo/" + pedido.id,
                      {
                        ...pedido,
                        situacao: "finalizado"
                      }
                    )
                    .then(response => {
                      this.devolucaooOk();
                    });
                  this.getListaLivros();
                });
            });
        })
      ],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });
  };

  devolucaooOk = () =>
    this.dialog.show({
      title: "Sucesso",
      body: "Devolução efetuada com sucesso!",
      actions: [Dialog.OKAction()],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });

  render() {
    return (
      <div>
        <div className="container">
          <h2>Usuário - Código {this.state.id}</h2>
          <div style={divExibeLivro}>
            <div>
              <img src={this.state.url} style={imgPerfil}></img>
            </div>
            <div style={dadosLivro}>
              <p>
                <b style={subtitles}>Nome: </b>
                {this.state.nome}
              </p>
              <p>
                <b style={subtitles}>Idade </b>
                {this.state.idade}
              </p>
              <p>
                <b style={subtitles}>Cidade: </b>
                {this.state.cidade}
              </p>
              <p>
                <b style={subtitles}>Estado: </b>
                {this.state.estado}
              </p>
              <p>
                <b style={subtitles}>Idade: </b>
                {this.state.idade}
              </p>
              <p>
                <b style={subtitles}>E-mail: </b>
                {this.state.email}
              </p>
            </div>
          </div>
          <div>
            <div></div>
            <h1>Livros</h1>
          </div>
          <table class="table listas">
            <thead class="thead-main">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Imagem</th>
                <th scope="col">Nome</th>
                <th scope="col">Autor</th>
                <th scope="col">Categoria</th>
                <th scope="col">Edição</th>
                <th scope="col">Situação</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listaLivros.map(x => (
                <tr
                  style={{
                    backgroundColor: x.emprestado ? "#293d7c05" : "#ffffff"
                  }}
                >
                  <th scope="row">
                    <a href={`/livros/${x.id}`}>{x.id}</a>
                  </th>
                  <td>
                    <img src={x.url} alt={x.nome} style={imgLivro}></img>
                  </td>
                  <td>{x.nome}</td>
                  <td>{x.autor}</td>
                  <td>{x.categoria}</td>
                  <td>{x.edicao}</td>
                  <td>{this.alteraBotao(x)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default Cliente;
