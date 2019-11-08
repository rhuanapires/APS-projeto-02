import React, { Component } from "react";
import axios from "axios";

export class ListaClientes extends Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/clientes/")
      .then(resposta => this.setState({ clientes: resposta.data }))
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div>
        <h1>Clientes</h1>
        <table class="table">
          <thead class="thead-main">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Idade</th>
              <th scope="col">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clientes.map(x => (
              <tr>
                <th scope="row">
                  <a href={`/clientes/${x.id}`}>{x.id}</a>
                </th>
                <td>{x.nome}</td>
                <td>{x.cidade}</td>
                <td>{x.estado}</td>
                <td>{x.idade}</td>
                <td>{x.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListaClientes;
