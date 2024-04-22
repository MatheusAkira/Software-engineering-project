import React, { useState } from 'react';
import './Compromisso.css';

function Compromisso({ compromisso }) {
    const [hora, setHora] = useState(compromisso.hora);
    const [data, setData] = useState(compromisso.data);
    const [nome, setNome] = useState(compromisso.nome);

    const [showEditor, setShowEditor] = useState(false);

    function editarProgramacao(e) {
        e.preventDefault();

        console.log('Editando compromisso:', compromisso);
        console.log('Novos dados:', hora, data, nome);
        compromisso.hora = hora;
        compromisso.data = data;
        compromisso.nome = nome;
    }

    function deletarProgramacao() {
        console.log('Deletando compromisso:', compromisso);
    }

    return (
        <div className="blocoCompromissos">
            <div>
                <a>
                    {compromisso.hora} {compromisso.data} {compromisso.nome}
                </a>
                <button id="botaoEditar" onClick={() => setShowEditor(!showEditor)}>Editar</button>
            </div>

            {showEditor && (
                <div className="dropEditor">
                    <form onSubmit={editarProgramacao}>
                        <div>
                            <label>Nome</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label>Data</label>
                            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                            <label>Hora</label>
                            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <input type="submit" value="Salvar" />
                        <input type="button" value="Deletar" onClick={deletarProgramacao} />
                    </form>
                </div>
            )}
        </div>
    );
}

export default Compromisso;
