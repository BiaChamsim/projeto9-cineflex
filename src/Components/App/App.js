import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../HomeScreen/HomeScreen.js';
import Header from '../Header/Header.js';
import Sessao from '../Sessao/Sessao.js';
import Assento from '../Assento/Assento.js';
import './App.css';

export default function App (){
    return(
        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path='/' element={<HomeScreen />} />    
                    <Route path='/filme/:filmeId' element={<Sessao />} />   
                    <Route path='/assento/:assentoId'  element={<Assento />} />
                </Routes>
            </div>        
        </BrowserRouter>
    )
}