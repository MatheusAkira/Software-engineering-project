import React, { useState, useEffect } from 'react';
import './Compromisso.css';

function Compromisso({ compromisso }) {
    const [hora, setHora] = useState(compromisso.hora);
    const [data, setData] = useState(compromisso.data);
    const [nome, setNome] = useState(compromisso.nome);

    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        document.getElementById('botaoEditar').onclick = function () {
            setShowEditor((prev) => !prev);
        };
    }, []);

    function editarProgramacao(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const url = compromisso.tipo === 'tarefa' ? `http://localhost:8080/tarefas/${compromisso.id}` : `http://localhost:8080/eventos/${compromisso.id}`;

        const newData = {
            hora,
            data,
            nome
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error('Falha ao editar compromisso.');
            }
        })
        .catch(error => {
            console.error('Erro ao editar compromisso:', error);
        });
    }

    function deletarProgramacao() {
        const token = localStorage.getItem('token');

        const url = compromisso.tipo === 'tarefa' ? `http://localhost:8080/tarefas/${compromisso.id}` : `http://localhost:8080/eventos/${compromisso.id}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Compromisso deletado com sucesso');
                window.location.reload();
            } else {
                throw new Error('Falha ao deletar compromisso.');
            }
        })
        .catch(error => {
            console.error('Erro ao deletar compromisso:', error);
        });
    }

    return (
        <div id="blocoCompromissos" className="blocoCompromissos">
            <div>
                <a>{hora} {data} {nome}</a>
                <button id="botaoEditar" onClick={() => setShowEditor(!showEditor)}>Editar</button>
            </div>

            {showEditor && (
                <div id="editor" className="dropEditor">
                    <form onSubmit={editarProgramacao}>
                        <div>
                            <label>Nome</label>
                            <textarea value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label>Data</label>
                            <input type="date" value={data} onChange={e => setData(e.target.value)} />
                            <label>Hora</label>
                            <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
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