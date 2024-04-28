import React, { useState, useEffect } from 'react';
import './Compromisso.css';

function Compromisso({ compromisso }) {
    const [hora, setHora] = useState(compromisso.hora);
    const [data, setData] = useState(compromisso.data);
    const [nome, setNome] = useState(compromisso.nome);

    const [showEditor, setShowEditor] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    function editarProgramacao(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const url = compromisso.tipo === 'tarefa' ? `http://localhost:8080/tarefas/${compromisso.id}` : `http://localhost:8080/eventos/${compromisso.id}`;
        console.log('Tipo:', compromisso.tipo);

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
                console.log('Resposta do servidor:', response);
                if (response.ok) {
                    // Atualizar o estado do componente com os novos valores
                    compromisso.hora = hora;
                    compromisso.data = data;
                    compromisso.nome = nome;
                    // Fechar o editor
                    setShowEditor(false);
                    setIsEditorOpen(false);
                    // Forçar a atualização da página
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

    const handleEditClick = () => {
        setShowEditor(!showEditor);
        setIsEditorOpen(!isEditorOpen);
    };

    return (
        <div
            id="blocoCompromissos"
            className="blocoCompromissos"
            style={{ backgroundColor: isEditorOpen ? 'red' : 'inherit' }}
        >
            <div>
                <a> {data} {' | '} {hora} {' | '} {nome}</a>
                <div className='botoesCompromisso'>
                    <button id="botaoConcluido"> &#10004; </button>
                    <button id="botaoEditar" onClick={handleEditClick}> &#9998; </button>
                </div>
            </div>

            {showEditor && (
                <div id="editor" className="dropEditor">
                    <form onSubmit={editarProgramacao}>
                        <div>
                            <label> Descrição: </label>
                            <textarea value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label> Data: </label>
                            <input type="date" value={data} onChange={e => setData(e.target.value)} />
                            <label> Hora: </label>
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
