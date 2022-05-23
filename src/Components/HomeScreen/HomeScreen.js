import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './HomeScreen.css'


export default function HomeScreen(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
        promise.then(resposta => setFilmes(resposta.data));
        promise.catch(erro => alert(`Erro ao buscar filmes: ${erro.message}`));
    }, [])

    return(
            <div className="container">
                <h1> Selecione o filme </h1>
                <div>
                    {filmes.map(filme => <Link to={`/filme/${filme.id}`}> <img src={filme.posterURL}></img></Link>)}
                </div>
            </div>
    )
}