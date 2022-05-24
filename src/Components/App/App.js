import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import HomeScreen from '../HomeScreen/HomeScreen.js';
import Header from '../Header/Header.js';
import Sessao from '../Sessao/Sessao.js';
import Assento from '../Assento/Assento.js';
import Sucesso from '../Sucesso/Sucesso.js';
import './App.css';

export default function App (){

    const [data, setData] = useState([]);
    const [assentoEscolhido, setAssentoEscolhido] = useState([]);
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [filme, setFilme] = useState([]);

    function resetData(){
        setData([]);
        setCpf("");
        setNome("");
        setFilme([]);
        setAssentoEscolhido([]);
    }


    return(
        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path='/' element={<HomeScreen />} />    
                    <Route path='/filme/:filmeId' element={<Sessao />} />   
                    <Route path='/assento/:assentoId'  element={<Assento
                                                                     assentoEscolhido ={assentoEscolhido}
                                                                     setAssentoEscolhido={setAssentoEscolhido}
                                                                     setCpf={setCpf}
                                                                     cpf={cpf}
                                                                     nome={nome}
                                                                     setNome={setNome}
                                                                     setFilme={setFilme} />} />

                     <Route path="/sucesso" element={<Sucesso
                                                             resetData={resetData}
                                                             cpf={cpf}
                                                             nome={nome}
                                                             filme={filme}
                                                             assentoEscolhido ={assentoEscolhido}/>} />
                </Routes>
            </div>        
        </BrowserRouter>
    )
}