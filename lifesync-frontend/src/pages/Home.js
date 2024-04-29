import React, { useEffect } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import fotoPerfil from '../fotoPerfil.png';
import Calendar from '../components/Calendar';
import Tarefa from '../components/Tarefa';
import Evento from '../components/Evento';
import Programacao from '../components/Programacao';
import './Home.css';


function Home(){
    // Ao clicar em botaoNovaTarefa mostrar novaTarefa
    
    useEffect(() => {
        // Ao clicar em botaoNovaTarefa mostrar novaTarefa
        document.getElementById('botaoNovaTarefa').onclick = function () {
            var novaTarefa = document.getElementById('novaTarefa');
            var novoEvento = document.getElementById('novoEvento');
            if (novaTarefa.style.display === 'none') {
                novoEvento.style.display = 'none';
                novaTarefa.style.display = 'block';
            } else {
                novaTarefa.style.display = 'none';
            }
        }

        // Ao clicar em botaoNovoEvento mostrar novoEvento
        document.getElementById('botaoNovoEvento').onclick = function () {
            var novaTarefa = document.getElementById('novaTarefa');
            var novoEvento = document.getElementById('novoEvento');

            if (novoEvento.style.display === 'none') {
                novoEvento.style.display = 'block';
                novaTarefa.style.display = 'none';
            } else {
                novoEvento.style.display = 'none';
            }
        }
    }, []); // Executar apenas uma vez após a montagem
    
    return (
        <div className="container">
            <div id="header" className="header">
                <div className="headerLogo">
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                    <a>LifeSync</a>  
                </div>
                
                <div className="dropdown">
                    <img src={fotoPerfil} className="dropbtn" alt="fotoPerfil" />
                    <div className="dropdown-content">
                        <a href="/singIn">Sair</a>
                    </div>
                </div>       
            </div>
            <div className="columns">
                <div id="coluna1" className="column">

                    <button id="botaoNovaTarefa" className="button">Nova Tarefa</button>
                    <button id="botaoNovoEvento" className="button">Novo Evento</button>
                    <button id="botaoAudio" className="button" onClick={() => {}}><i className="gg-mic"></i></button>
                    
                    <div id="novaTarefa" className="dropTarefa">
                        <Tarefa />
                    </div>

                    <div id="novoEvento" className="dropEvento">
                       <Evento />
                    </div>

                    <div id="calendarioBox">
                        <Calendar />
                    </div>

                </div>
                <div id="coluna2" className="column">
                    <h1> SUA PROGRAMAÇÃO </h1>
                    <div className='scrollBar'>
                        <Programacao />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;