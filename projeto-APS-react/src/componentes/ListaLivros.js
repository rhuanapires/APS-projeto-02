import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import axios from "axios";
import imgLivro from "../styles/ListaLivros";
import { Slideshow } from "./slider.js";

export default class ListaLivros extends Component {
  constructor(props) {
    super(props);
    this.state = { prods: [], resultadoPesquisa: [], pesquisaLivro: "" };
  }

  componentDidMount() {
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

  handlerSearch = text => {
    this.setState({ pesquisaLivro: text.target.value }, this.pesquisa);
  };

  pesquisa = () => {
    const { prods, pesquisaLivro } = this.state;

    const result = prods.filter(livro => {
      if (
        livro.nome.toLowerCase().includes(pesquisaLivro.toLowerCase()) ||
        livro.autor.toLowerCase().includes(pesquisaLivro.toLowerCase())
      ) {
        return true;
      }
    });

    this.setState({ resultadoPesquisa: pesquisaLivro ? result : prods });
  };

  render() {
    // const images = [
    //   {
    //     url:
    //       "https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg"
    //   },
    //   { url: "https://miro.medium.com/max/2048/1*YLlZ96J3p8GFkIh1USVMzg.jpeg" },
    //   {
    //     url:
    //       "https://video-images.vice.com/articles/5d44c9622980b0000824a7e3/lede/1564789576071-GettyImages-949118068.jpeg"
    //   },
    //   {
    //     url:
    //       "http://www.charlottenewsvt.org/wp-content/uploads/2018/03/books.jpg"
    //   }
    // ];
    return (
      <div>
        <div>
          {/* <div style={{ alignItems: "center" }}>
            <SimpleImageSlider
              width={window.screen.width}
              height={400}
              images={images}
              showBullets="true"
              slideDuration="2"
              useGPURender="true"
            />
          </div> */}
          <Slideshow></Slideshow>
          <h1>Livros Disponíveis</h1>
        </div>
        <div style={{ height: 40 }}>
          <input
            style={{ width: "50%" }}
            value={this.state.pesquisaLivro}
            onChange={this.handlerSearch}
            placeholder={"Pesquise por título ou autor"}
          ></input>
        </div>
        <table class="table">
          <thead class="thead-main">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagem</th>
              <th scope="col">Nome</th>
              <th scope="col">Autor</th>
              <th scope="col">Categoria</th>
              <th scope="col">Edição</th>
            </tr>
          </thead>
          <tbody>
            {this.state.resultadoPesquisa.map(x => (
              <tr
                style={{
                  backgroundColor: x.emprestado ? "#293d7c05" : "#ffffff",
                  opacity: x.emprestado ? 0.3 : 1.0
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
