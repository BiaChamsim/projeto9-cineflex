import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sessao.css'

export default function Sessao(){

    const  { filmeId }  = useParams();

    const [sessoes, setSessoes] = useState([]);

    const [poster, setPoster] = useState({});

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`)
        promise.then(resposta => {
            setSessoes(resposta.data.days)
            setPoster({posterURL: resposta.data.posterURL, title: resposta.data.title})
        });
        promise.catch(erro => alert(`Erro ao buscar sessões: ${erro.message}`));
    }, [])


    return(
        <>
            <div className="container">
                <h1> Selecione o horário </h1>
                <div>
                    {sessoes.map(sessao => {
                        return (
                            <div className="sessoes">
                                <p className="day">{sessao.weekday} - {sessao.date}</p>
                                <p>
                                    {sessao.showtimes.map(time => 
                                    <Link style={{textDecoration:"none"}} to={`/assento/${time.id}`} className="hour">{time.name}</Link>
                                    )}         
                                </p>                   
                            </div>
                        )
                    })}
                </div>
                <div className="rodape">
                    <img src={poster.posterURL}/> <p>{poster.title}</p>
                </div>
            </div>
        </>
    )
}