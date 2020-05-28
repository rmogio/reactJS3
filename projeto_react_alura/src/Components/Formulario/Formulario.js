import React, { Component } from 'react'
import FormValidator from '../../Utils/FormValidator'
import PopUp from '../../Utils/PopUp'

class Formulario extends Component{

  constructor(props){
    super(props)

    this.validador = new FormValidator([
      {
        campo:'nome',
        metodo:'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um nome'
      },
      {
        campo:'livro',
        metodo:'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um livro'
      },
      {
        campo:'preco',
        metodo:'isInt',
        args: [{min:0, max:9999}],
        validoQuando: true,
        mensagem: 'Entre com um valor numerico'
      }
  ])

    this.stateInicial = {
      nome:'',
      livro:'',
      preco:'',
      validacao: this.validador.valido()
    }
    this.state = this.stateInicial
  }

  submitForm = () => {

    const validacao = this.validador.valida(this.state)

    if(validacao.isValid){

      this.props.escutadorDeSubmit(this.state)
      this.setState(this.stateInicial)

    }else{

      const {nome, livro, preco} = validacao
      const campos = [nome, livro, preco]

      const camposInvalidos = campos.filter(elem => {
        return elem.isInvalid
      })
      camposInvalidos.forEach(campo => {
        PopUp.exibeMensagem('error', campo.message)
      })
    }
  }

  escutadorDeInput = event => {
    const {name, value} = event.target

    this.setState({
      [name] : value
    })
  }

  render(){
    const {nome, livro, preco} = this.state

    return(
      <form>
        <div className='row'>
          <div className='input-field col s4'>
            <label className='input-field' htmlFor="nome">Nome</label>
            <input 
              className= 'validate'
              id='nome'
              type="text"
              name='nome'
              value={nome}
              onChange={this.escutadorDeInput} />
          </div>

          <div className="input-field col s4">
            <label className='input-field' htmlFor="livro">Livro</label>
            <input 
              id='livro'
              type="text"
              name='livro'
              value={livro}
              onChange={this.escutadorDeInput} />
          </div>

          <div className="input-field col s4">
            <label className='input-field' htmlFor="preco">Preco</label>
            <input 
              id='preco'
              type="text"
              name='preco'
              value={preco}
              onChange={this.escutadorDeInput} />            
          </div>
        </div>

        <button 
          className="btn waves-effect waves-light green lighten-2b" 
          type="button" 
          name="action"
          onClick={this.submitForm}>enviar
          <i className="material-icons right">send</i>
        </button>

      </form>
    )
  }
}

export default Formulario