"use client"

import React from 'react';
import './globals.css';

export default function Home(){
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
            setErro(false);
            setRua(address.logradouro);
            setBairro(address.bairro);
            setEstado(address.uf);
            setCidade(address.localidade);
          }
        }
      }
      pegarCpf();
    }
  },[cep])

  getDados();

  return (
    <>
      <form>
        <input type="text" value={cep} placeholder='CEP' onChange={(a) => setCep(a.target.value)}/>
        {(erro && <p>CEP INVÁLIDO</p>)}
        <input type="text" value={rua} placeholder='RUA' onChange={(a) => setCep(a.target.value)}/>
        <input type="text" value={numero} placeholder='NUMERO' onChange={(a) => setCep(a.target.value)}/>
        <input type="text" value={bairro} placeholder='BAIRRO' onChange={(a) => setCep(a.target.value)}/>
        <input type="text" value={estado} placeholder='ESTADO' onChange={(a) => setCep(a.target.value)}/>
        <input type="text" value={cidade} placeholder='CIDADE' onChange={(a) => setCep(a.target.value)}/>
      </form>
    </>
  )

}
