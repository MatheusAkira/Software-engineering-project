import React, { useState } from 'react';
import './Tarefa.css';

function Tarefa() {
    //Criar variaveis pro formulário:

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [prazoEmDias, setPrazoEmDias] = useState('');
    const [ativa, setAtiva] = useState('');
    const [concluida, setConcluida] = useState('');

    function cadastrarTarefa(e) {
        //Cadastrar tarefa
        e.preventDefault();
        console.log('Tarefa cadastrada');
        console.log('Titulo: ' + titulo);
        console.log('Data: ' + data);
        console.log('Hora: ' + hora);
    }

    //Formulário com titulo, data, hora, prazonEmDias
    return (

        <div class="blocoTarefa">
            <form onSubmit={cadastrarTarefa}>
                <div>
                    <label> Titulo </label>
                </div>
                <div>
                    <textarea type="text" value={titulo} onChange={e => setTitulo(e.target.value)}> </textarea>
                </div>
                <div>
                    <label> Data </label>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} />
                
                    <label> Hora </label>
                    <input type="time" value={hora} onChange={e => setHora(e.target.value)} />

                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}

export default Tarefa;
