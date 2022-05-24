import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Assento.css'

export default function Assento(props){

    const {assentoEscolhido,
        setAssentoEscolhido, 
        cpf,
        setCpf,
        nome, 
        setNome,
        setFilme} = props

    const  { assentoId }  = useParams();

    const [assentos, setAssentos] = useState([]);

    const [hora, setHora] = useState({});

    const [assentosNovos, setAssentosNovos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${assentoId}/seats`)
        promise.then(resposta => {
            setAssentos(resposta.data.seats)
            setFilme(resposta.data)

            console.log(resposta.data)

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

        setAssentosNovos(novosAssentos)
        const assentoEscolhido = assentosNovos.filter(assentosNovo => assentosNovo.isSelected === true)
        setAssentoEscolhido(assentoEscolhido)   

    }

    function enviarInfo(event){
        event.preventDefault();
        
        if(assentoEscolhido.length === 0){
            alert("Escolha ao menos um assento")
            return
        } 
        if(cpf === null){
            alert("CPF inválido")
            return
        }

        const body = {
            ids: assentoEscolhido.map(assento => assento.id),
            name: nome,
            cpf: cpf
        }
        const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body)
        request.then(response => {
            navigate("/sucesso")
            console.log(response)
        
        })
        
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
                    <form className="campos-input" onSubmit={enviarInfo}>
                        <label for="campoNome" >Nome do comprador</label>
                        <input type="text" id="campoNome" value={nome} required onChange={(event) => setNome(event.target.value)} placeholder="Digite seu nome..."></input>
                        
                        <label for="campoCPF">CPF do comprador</label>
                            <input type="text" id="campoCPF" value={cpf} required onChange={(event) => setCpf(event.target.value)} placeholder="Digite seu CPF..."></input>
                        
                        <div className="reserva">
                            <button>Reservar assento(s)</button>
                        </div>
                    </form>

                    <div className="rodape">
                        <img src={hora.url}/> <p>{hora.dia}</p> <p>{hora.hora}</p>
                    </div>
                </div>
            </div>
    )
}