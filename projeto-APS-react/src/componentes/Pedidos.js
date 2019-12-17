import React, { Component } from "react";
import axios from "axios";
import {
  imgLivroPedido,
  divExibeLivro,
  dadosLivro,
  subtitles
} from "../styles/InformacaoLivro";
import Dialog from "react-bootstrap-dialog";
import { getCurrentData } from "../util/dateUtil";

export class Pedidos extends Component {
  constructor(props, match) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      id: params.id,
      idCliente: params.idCliente,
      idDono: params.idDono,
      idProduto: params.idProduto,
      data: params.data,
      situacao: params.situacao,
      nomeCliente: params.nomeCliente,
      nomeDono: params.nomeDon,
      tituloLivro: params.nomeLivro,
      autor: params.autor,
      url: params.url
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/pedidoEmprestimo/" + this.state.id)
      .then(resposta => {
        this.setState({ id: resposta.data.id });
        this.setState({ idCliente: resposta.data.idCliente });
        this.setState({ idDono: resposta.data.idDono });
        this.setState({ idProduto: resposta.data.idProduto });
        this.setState({ data: resposta.data.data });
        this.setState({ situacao: resposta.data.situacao });
        console.log(resposta);
        axios
          .get("http://localhost:3000/clientes/" + this.state.idDono)
          .then(resposta => {
            this.setState({ nomeDono: resposta.data.nome });
            console.log(resposta);
            axios
              .get("http://localhost:3000/clientes/" + this.state.idCliente)
              .then(resposta => {
                this.setState({ nomeCliente: resposta.data.nome });
                console.log(resposta);
                axios
                  .get("http://localhost:3000/livros/" + this.state.idProduto)
                  .then(resposta => {
                    this.setState({
                      tituloLivro: resposta.data.nome,
                      autor: resposta.data.autor,
                      url: resposta.data.url
                    });
                    console.log(resposta);
                  })
                  .catch(erro => console.log(erro));
              })
              .catch(erro => console.log(erro));
          })
          .catch(erro => console.log(erro));
      })
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div className="container">
        <h2>Pedido número {this.state.id}</h2>
        <div style={divExibeLivro}>
          <div>
            <img src={this.state.url} style={imgLivroPedido}></img>
          </div>
          <div style={dadosLivro}>
            <p>
              <b style={subtitles}>Título do Livro: </b>
              {this.state.tituloLivro}
            </p>
            <p>
              <b style={subtitles}>Autor: </b>
              {this.state.autor}
            </p>
            <p>
              <b style={subtitles}>Pertencente a: </b>
              <a href={`/clientes/${this.state.idDono}`}>
                {this.state.nomeDono}
              </a>
            </p>
            <p>
              <b style={subtitles}>Nome do Solicitante: </b>
              <a href={`/clientes/${this.state.idCliente}`}>
                {this.state.nomeCliente}
              </a>
            </p>
            <p>
              <b style={subtitles}>Data do Empréstimo: </b>
              {this.state.data}
            </p>
            <p>
              <b style={subtitles}>Status do Pedido: </b>
              {this.state.situacao}
            </p>
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

export default Pedidos;
