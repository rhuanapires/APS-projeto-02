import React, { Component } from "react";

export default class AlugarLivro extends Component {
  constructor(props) {
    axios
      .get("http://localhost:3000/livros/")
      .then(resposta =>
        this.setState({
          prods: resposta.data,
          resultadoPesquisa: resposta.data
        })
      )
      .catch(erro => console.log(erro));
  }

  componentDidMount() {}

  render() {}
}
