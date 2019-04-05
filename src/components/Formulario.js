import React, { Component } from 'react'
import axios from 'axios';
import Cryptomoneda from './Cryptomoneda';
import Error from './Error';

class Formulario extends Component {



  state = {
    cryptomonedas: [],
    moneda: '',
    cryptomoneda: '',
    error: false
   }

   async componentWillMount() {
     const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`


   await axios.get(url).then(respuesta => {
     this.setState({
       cryptomonedas: respuesta.data.Data
     })
   })
  }

  //alternativa a Refs
  //se ejecuta cada vez que el usuario elige una opcion del select
  obtenerValor = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  cotizarMoneda = (e) => {
    e.preventDefault()

    const {moneda, cryptomoneda} = this.state;

    //validar datos
    if(moneda === '' || cryptomoneda === '') {
      this.setState({
        error: true
      }, () => {
        setTimeout(() => {
          this.setState({
            error: false
          })
        }, 3000)
      })
      return;
    }

    //crear objeto
    const cotizacion = {
      moneda, cryptomoneda
    }

    // enviar datos al App.js
    this.props.cotizarCryptoMoneda(cotizacion);


  }


  render() {

    const mensaje = (this.state.error) ?
    <Error mensaje="Ambos campos son requeridos" />
    : '';

    return (
      <form onSubmit={this.cotizarMoneda}>
      {mensaje}
        <div className="row">
            <label>Elige tu Moneda</label>
            <select name="moneda" onChange={this.obtenerValor}
                className="u-full-width">
                    <option value="">Elige tu moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="UYU">Peso Uruguayo</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euros</option>
            </select>
        </div>

        <div className="row">
          <div>
            <label>Elige tu Criptomoneda</label>
            <select className="u-full-width" name="cryptomoneda" onChange={this.obtenerValor}>
                  <option value="">Elige tu moneda</option>
                  {Object.keys(this.state.cryptomonedas).map(key=>(
                    <Cryptomoneda key={key} cryptomoneda={this.state.cryptomonedas[key]} />
                  ))}
            </select>
          </div>
        </div>
        <input className="button-primary u-full-width" type="submit" value="Cotizar" />
    </form>
    );
  }
}

export default Formulario;
