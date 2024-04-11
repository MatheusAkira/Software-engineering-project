import React, { useState, useEffect } from 'react';
import './Compromisso.css';

function Compromisso( {compromisso} ) {
    //Variáveis de compromisso
    const [hora, setHora] = useState(compromisso.hora);
    const [data, setData] = useState(compromisso.data);
    const [nome, setNome] = useState(compromisso.nome);
    const [token, setToken] = useState('');

    //Ao clicar no botão de editar, mostrar o formulario de edição
    useEffect(() => {
        document.getElementById('botaoEditar').onclick = function () {
            var editor = document.getElementById('editor');
            var bloco = document.getElementById('blocoCompromissos');
            if (editor.style.display === 'none') {
                editor.style.display = 'block';
                bloco.style.backgroundColor = 'brown';
            }else {
                editor.style.display = 'none';
                bloco.style.backgroundColor = '#241B2F';
            }
        }
    }, []);


    //Função para editar um compromisso

    function editarProgramacao(e) {
        e.preventDefault();

        console.log('Editando compromisso:', compromisso);
        console.log('Novos dados:', hora, data, nome);
        compromisso.hora = hora;
        compromisso.data = data;
        compromisso.nome = nome;
        
        //Recarregar a pagina
        window.location.reload();
    }

    //Função para Deletar um compromisso
    function deletarProgramacao() {
        console.log('Deletando compromisso:', compromisso);
    }

    //Return que mostra um compromisso concatenando  hora data e nome em uma div vindos de compromisso.
    return (
        <div id="blocoCompromissos" class="blocoCompromissos">
            <div>
                <a>{compromisso.hora} {compromisso.data} {compromisso.nome}</a>
                <button id="botaoEditar">Editar</button>
            </div>

            <div id="editor" class="dropEditor">
                <form onSubmit={editarProgramacao}>
                    <div>
                        <label>Nome</label>
                        <textarea type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label>Data</label>
                        <input type="date" value={data} onChange={e => setData(e.target.value)} />
                        <label>Hora</label>
                        <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
                    </div>
                    <input type="submit" value="Salvar" />
                    <input type="submit" value="Deletar" onClick={deletarProgramacao} />
                </form>
            </div>
        </div>
    );
}

export default Compromisso;