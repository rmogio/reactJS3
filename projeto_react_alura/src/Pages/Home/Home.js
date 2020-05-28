import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css'
import Header from '../../Components/Header/Header'
import Tabela from '../../Components/Tabela/Tabela'
import Form from '../../Components/Formulario/Formulario'
import PopUp from '../../Utils/PopUp'
import ApiService from '../../Utils/ApiService'


class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      autores:[]
    }
  }

  removeAutor = id =>{
    const {autores} = this.state

    const autoresAtualizado = autores.filter(autor =>{
      return autor.id !== id
    })

    ApiService.RemoveAutor(id)
      .then(res => {
        if(res.message === 'deleted'){
          this.setState({autores: [...autoresAtualizado]})
          PopUp.exibeMensagem('error', 'Autor removido com sucesso')
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com o API para remover'))
  }

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if(res.message === 'success'){
          this.setState({ autores : [...this.state.autores, res.data] })
          PopUp.exibeMensagem('success', "Autor adicionado com sucesso")
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API para adicionar'))
      
  }


  componentDidMount(){
    ApiService.ListaAutores()
      .then(res => {
        if(res.message === 'success'){
          this.setState({autores: [...this.state.autores, ...res.data]})
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API para listar'))
  }
  render(){
    const campos = [
      {titulo: 'Autores', dado: 'nome'},
      {titulo: 'Livros', dado: 'livro'},
      {titulo: 'Precos', dado: 'preco'}
    ]

    return (
      <Fragment>
          <Header />
        <div className='container mb-10'>
          <h2>Casa do Código</h2>
          <Form escutadorDeSubmit = {this.escutadorDeSubmit} />
          <Tabela 
            campos={campos} 
            dados = {this.state.autores} 
            removeDados = {this.removeAutor} 
          />
        </div>
      </Fragment>
    );
  }
}

export default Home;
