import React from 'react';

const Resultado = ({resultado}) => {

  if(Object.entries(resultado).length === 0) return null;


  return (
    <div className="resultado">
    <h2>Resultado</h2>
    <p className="precio">El precio es {resultado.PRICE}</p>
    <p>Precio mas Alto hoy: {resultado.HIGHDAY}</p>
    <p>Precio mas Bajo hoy: {resultado.LOWDAY}</p>
    </div>
  );
}

export default Resultado;
