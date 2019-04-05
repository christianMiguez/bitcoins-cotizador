import React, { Component } from 'react';
import image from './cryptomonedas.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import axios from 'axios';

class App extends Component {

  state = {
    resultado: {},
    monedaSeleccionada: '',
    cryptoSeleccionada: '',
    cargando: false
  }

  cotizarCryptoMoneda = async (cotizacion) => {

    const {moneda, cryptomoneda} = cotizacion;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`

    await axios.get(url).then(respuesta => {
      this.setState({
        resultado: respuesta.data.DISPLAY[cryptomoneda][moneda],
        cargando: true
      })
    })

    setTimeout(() => {
      this.setState({
        cargando: false
      })
    }, 3000)
  }


  render() {

    const resultado = (this.state.cargando)
    ?
    <Spinner />
    :
    <Resultado resultado={this.state.resultado}/>


    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <img src={image} alt="" className="logotipo"/>
            </div>
            <div className="one-half column">
            <h1>Cotiza Cryptomonedas al instante</h1>
             <Formulario cotizarCryptoMoneda={this.cotizarCryptoMoneda}/>
            {resultado}

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
