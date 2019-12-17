import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListaLivros from "./componentes/ListaLivros";
import { ListaClientes } from "./componentes/ListaClientes";
import { Cliente } from "./componentes/Cliente";
import { Livro } from "./componentes/Livro";
import { ListaPedidos } from "./componentes/ListaPedidos";
import Pedidos from "./componentes/Pedidos";

export default class Rotas extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ListaLivros} />
        <Route exact path="/produtos" component={ListaLivros} />
        <Route exact path="/livros/:id" component={Livro} />
        <Route exact path="/clientes" component={ListaClientes} />
        <Route exact path="/clientes/:id" component={Cliente} />
        <Route exact path="/pedidos" component={ListaPedidos} />
        <Route exact path="/pedidos/:id" component={Pedidos} />
      </Switch>
    );
  }
}
