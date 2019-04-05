import React from 'react'

const Cryptomoneda = ({cryptomoneda}) => {

  const {FullName, Name} = cryptomoneda.CoinInfo
  return (
    <option value={Name}>{FullName}</option>
  );
}

export default Cryptomoneda;
