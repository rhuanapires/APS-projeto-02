import React, { Component } from "react";
import axios from "axios";
import imgLivro, {
  divExibeLivro,
  dadosLivro,
  subtitles
} from "../styles/InformacaoLivro";

export class Livro extends Component {
  constructor(props, match) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      id: params.id,
      nome: params.nome,
      autor: params.autor,
      categoria: params.categoria,
      edicao: params.edicao,
      emprestado: params.emprestado,
      url: params.url
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/livros/" + this.state.id)
      .then(resposta => {
        this.setState({ nome: resposta.data.nome });
        this.setState({ autor: resposta.data.autor });
        this.setState({ categoria: resposta.data.categoria });
        this.setState({ edicao: resposta.data.edicao });
        this.setState({ emprestado: resposta.data.emprestado });
        this.setState({ url: resposta.data.url });
        console.log(resposta);
      })
      .catch(erro => console.log(erro));
  }

  emprestado() {
    var { emprestado } = this.state;
    return emprestado === true ? "Sim" : "Nxão";
  }

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
          </div>
        </div>
      </div>
    );
  }
}

export default Livro;
