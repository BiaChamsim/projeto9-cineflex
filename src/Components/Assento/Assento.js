import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Assento.css'

export default function Assento(){

    const  { assentoId }  = useParams();

    const [assentos, setAssentos] = useState([]);

    const [hora, setHora] = useState({});

    const [assentosNovos, setAssentosNovos] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${assentoId}/seats`)
        promise.then(resposta => {
            setAssentos(resposta.data.seats)
            setHora({url: resposta.data.movie.posterURL, dia: resposta.data.day.weekday, hora: resposta.data.name})
        });
        promise.catch(erro => alert(`Erro ao buscar assentos: ${erro.message}`));
    }, [])


    function seatSelected(id, isAvailable){

        if(isAvailable === false){
            alert ('Esse assento não está disponível')
            return
        }

        const novosAssentos = assentos.map(assento => {
            if(assento.id === id){
                assento.isSelected = !assento.isSelected
            }
            return assento;
        })

        setAssentosNovos(novosAssentos);        
    }

    return(
            <div className="container">
                <h1>Selecione o(s) assento(s)</h1>
                <div className="itens">
                    {assentos.map(assento => 
                    <div key={assento.id} onClick={() => seatSelected(assento.id, assento.isAvailable)} className={`assentos ${assento.isAvailable} ${assento.isSelected ? "selected" : ""} `}>{assento.name}</div>
                    )}
                </div>
                <div className="opcoes">
                    <div className="selecionado">
                        <div className="bolinha-s"></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="disponivel">
                        <div className="bolinha-d"></div>
                        <p>Disponível</p>
                    </div>
                    <div className="indisponivel">
                        <div className="bolinha-i"></div>
                        <p>Indisponível</p>
                    </div>
                </div>
                <div className="inputs">
                    <div className="nome">
                        <p>Nome do comprador:</p>
                        <input></input>
                    </div>
                    <div className="cpf">
                        <p>CPF do comprador:</p>
                        <input></input>
                    </div>
                    <div className="reserva">
                        <p>Reservar assento(s)</p>
                    </div>
                    <div className="rodape">
                        <img src={hora.url}/> <p>{hora.dia}</p> <p>{hora.hora}</p>
                    </div>
                </div>
            </div>
    )
}