import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [clientesList, setClientesList] = useState([]);
  const [novoTelefone, setNovoTelefone] = useState("");
//  const APIURL = process.env.APIURL || "http://localhost:3001/";
  const APIURL = "https://innova-talk-22.herokuapp.com/"

  useEffect(() => {
    Axios.get(APIURL + "db/get").then((response)=> {
      setClientesList(response.data);
      //alert(APIURL);
      //console.log("oi"); //process.env.APIURL);
    });
  });

  const incluirCliente = () => {
    Axios.post(APIURL + "db/insert", {
      id:id, 
      nome: nome, 
      telefone:telefone
    }).then(() => {
      //alert("Cliente incluído");
    });
  };

  const alterarCliente = (idCliente) => {
    Axios.put(APIURL + "db/update", {
      id:idCliente, 
      telefone:novoTelefone
    }).then(() => {
      //alert("Cliente alterado");
      setNovoTelefone("");
    });
  };

  const excluirCliente = (idCliente) => {
     Axios.delete(`${APIURL}db/delete/${idCliente}`);
     //alert("Cliente excluído");
  };

  return (
    <div className="App">
      <h1>Innova Talk 2022</h1>
      <div className="form">
        <label>ID do Cliente:</label>
        <input type="text" name="id" onChange={(e)=> {
          setId(e.target.value)
        }}/>
        <label>Nome:</label>
        <input type="text" name="nome" onChange={(e)=> {
          setNome(e.target.value)
        }}/>
        <label>Telefone:</label>
        <input type="type" name="telefone" onChange={(e)=> {
          setTelefone(e.target.value)
        }}/>
        <button onClick={incluirCliente}>Enviar</button>

        {clientesList.map((val) => {
          return(
            <div className="card">
              <h1>{val.id} - {val.nome}</h1> 
              <p>Telefone: {val.telefone} </p>
              <button onClick={() => {excluirCliente(val.id)}}>Excluir</button>
              <input type="text" id="alterarInput" onChange={(e)=> {
                setNovoTelefone(e.target.value);
              }}/>
              <button onClick={() => {alterarCliente(val.id)}}>Alterar</button>
            </div>
          )
        })}
      </div>
     </div>
  );
}

export default App;
