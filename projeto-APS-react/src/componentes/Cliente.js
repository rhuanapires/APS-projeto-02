import React, { Component } from "react";
import axios from "axios";
import {
  imgPerfil,
  divExibeLivro,
  dadosLivro,
  subtitles
} from "../styles/InformacaoLivro";

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
      url: params.url
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
  }

  render() {
    return (
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
              {this.idade}
            </p>
            <p>
              <b style={subtitles}>E-mail: </b>
              {this.state.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cliente;
