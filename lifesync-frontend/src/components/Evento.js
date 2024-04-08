import React, { useState } from 'react';
import './Evento.css';

function Evento() {
    //Criar variaveis pro formulário:

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [ativa, setAtiva] = useState('');
    const [concluida, setConcluida] = useState('');
    const [local, setLocal] = useState('');

    function cadastrarEvento(e) {
        //Cadastrar Evento
        e.preventDefault();
        console.log('Evento cadastrada');
        console.log('Titulo: ' + titulo);
        console.log('Data: ' + data);
        console.log('Hora: ' + hora);
        console.log('Local: ' + local);
    }

    //Formulário com titulo, data, hora, prazonEmDias
    return (

        <div class="blocoEvento">
            <form onSubmit={cadastrarEvento}>
                <div>
                    <label> Descrição </label>
                </div>
                <div>
                    <textarea type="text" value={titulo} onChange={e => setTitulo(e.target.value)}> </textarea>
                </div>
                <div>
                    <label> Local </label>
                    <input type="text" value={local} onChange={e => setLocal(e.target.value)} />
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

export default Evento;
