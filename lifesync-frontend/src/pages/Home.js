import React, { useEffect } from 'react';
import Calendar from '../components/Calendar';
import logoLifeSync from '../logoLifeSync.png';
import './Home.css';
import '../components/Tarefa'
import Tarefa from '../components/Tarefa';

function Home(){
    // Ao clicar em botaoNovaTarefa mostrar novaTarefa
    
    useEffect(() => {
        // Ao clicar em botaoNovaTarefa mostrar novaTarefa
        document.getElementById('botaoNovaTarefa').onclick = function () {
            var novaTarefa = document.getElementById('novaTarefa');
            if (novaTarefa.style.display === 'none') {
                novaTarefa.style.display = 'block';
            } else {
                novaTarefa.style.display = 'none';
            }
        }

        // Ao clicar em botaoNovoEvento mostrar novoEvento
        document.getElementById('botaoNovoEvento').onclick = function () {
            var novoEvento = document.getElementById('novoEvento');
            if (novoEvento.style.display === 'none') {
                novoEvento.style.display = 'block';
            } else {
                novoEvento.style.display = 'none';
            }
        }
    }, []); // Executar apenas uma vez após a montagem

    return (
        <div class="container">
            <div id="header" class="header">
                <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                <h1>LifeSync</h1>
            </div>
            <div class="columns">
                <div id="coluna1" class="column">

                    <button id="botaoNovaTarefa" class="button">ADD Tarefa</button>
                    <button id="botaoNovoEvento" class="button">ADD Evento</button>
                    
                    <div id="novaTarefa" class="dropTarefa">
                        <Tarefa />
                    </div>

                    <div id="novoEvento" class="dropEvento">
                       <label>Evento</label>
                    </div>

                    <Calendar />

                </div>
                <div id="coluna2" class="column">
                    <h2> Programação</h2>
                </div>
            </div>
        </div>
    );

}

export default Home;