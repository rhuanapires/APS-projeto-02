import React, { Component } from "react";
import axios from "axios";

export class ListaPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = { pedidos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/pedidoEmprestimo/")
      .then(resposta => this.setState({ pedidos: resposta.data }))
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div>
        <h1>Pedidos</h1>
        <table class="table">
          <thead class="thead-main">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Produto</th>
              <th scope="col">Data</th>
              <th scope="col">Situação</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pedidos.map(x => (
              <tr>
                <th scope="row">
                  <a href="/{x.id}">{x.id}</a>
                </th>
                <td>{x.idCliente}</td>
                <td>{x.idProduto}</td>
                <td>{x.data}</td>
                <td>{x.situacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListaPedidos;
