import { useNavigate } from "react-router-dom";
import './Sucesso.css';

export default function Success(props){
    const{ cpf, nome, assentoEscolhido, filme, resetData} = props
    const navigate = useNavigate();
    console.log(filme)

    function handleClick(){
        resetData();
        navigate("/")
    }

    return(
        <>
            <div className="topo">
                <p>Pedido feito</p>
                <p>com sucesso!</p>
            </div>
            <div className="infos">
                <p>Filme e sessão</p>
                <h1>{filme.movie.title}</h1>
                <h1>{filme.day.date} {filme.name}</h1>
            </div>
            <div className="infos">
                <p>Ingressos</p>
                {assentoEscolhido.map((assentoEscolhido) =>{
                    return(<h1> Assento {assentoEscolhido.name} </h1>)})
                }
            </div>
            <div className="infos">
                <p>Pedido feito</p>
                <h1>Nome: {nome}</h1>
                <h1>CPF: {cpf}</h1>
            </div>
            <button onClick={handleClick}>
                Voltar pra home 
            </button>

        </>
    )

}