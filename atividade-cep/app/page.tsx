"use client"

import React from 'react';
import './globals.css';

export default function Home(){
  const [notFound, setNotFound] = React.useState(false);
  const [erro,setErro] = React.useState(false);
  const [cep, setCep] = React.useState("");
  const [rua, setRua] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [estado, setEstado] = React.useState("");
  const [cidade, setCidade] = React.useState("");


  async function getDados(){
    try{
      const address = await ((await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json())
      return address;

    }
    catch (erro){
      console.log("entrei aqui")
    }
  }

  React.useEffect(() => {
    if (cep.length === 8){
      async function pegarCpf(){
        const address = await (getDados());
        if (address){
          console.log(address)
          if(!address.erro){
            setNotFound(false);
            setErro(false);
            setRua(address.logradouro);
            setBairro(address.bairro);
            setEstado(address.uf);
            setCidade(address.localidade);
          }
          else{
            setNotFound(true);
            console.log("QUE RAIVAA");
          }
        }
      }
      pegarCpf();
    }
  },[cep])

  function changeError(){
    if (cep.length != 8 && cep.length > 0){
      setErro(true);
      setRua("");
      setNumero("");
      setBairro("");
      setEstado("");
      setCidade("");
    }
    else if(notFound){
      setErro(true);
      setRua("");
      setNumero("");
      setBairro("");
      setEstado("");
      setCidade("");
    }
    else{
      setErro(false);
    }
  }

  return (
    <>
      <h1>ADDRESS</h1>
      <form>
        <input type="text" className={erro ? 'cep-error' : 'cep' } value={cep} placeholder='CEP' onBlur={(a) => changeError()} onChange={(a) => setCep(a.target.value)}/>
        {(erro && <p>O CEP INFORMADO É INVÁLIDO</p>)}
        <input type="text" value={rua} placeholder='RUA' onChange={(a) => setRua(a.target.value)}/>
        <input type="text" value={numero} placeholder='NUMERO' onChange={(a) => setNumero(a.target.value)}/>
        <input type="text" value={bairro} placeholder='BAIRRO' onChange={(a) => setBairro(a.target.value)}/>
        <input type="text" value={estado} placeholder='ESTADO' onChange={(a) => setEstado(a.target.value)}/>
        <input type="text" value={cidade} placeholder='CIDADE' onChange={(a) => setCidade(a.target.value)}/>
      </form>
    </>
  )

}
