import React, { useState, useEffect } from 'react';
import './Compromisso.css';

function Compromisso({ compromisso }) {
    const [hora, setHora] = useState(compromisso.hora);
    const [data, setData] = useState(compromisso.data);
    const [titulo, setTitulo] = useState(compromisso.titulo);
    const [tarefaConcluida, setTarefa] = useState(null);
    const [local, setLocalEvento] = useState(null);


    const [showEditor, setShowEditor] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const url = compromisso.tipo === 'tarefa' ? `http://localhost:8080/tarefas/${compromisso.id}` : `http://localhost:8080/eventos/${compromisso.id}`;

    const obterTarefa = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const dadosTarefa = await response.json();
                setTarefa(dadosTarefa.concluida);
            } else {
                console.error('Falha ao obter dados da tarefa');
            }
        } catch (error) {
            console.error('Erro ao obter dados da tarefa:', error);
        }
    };

    const obterEvento = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const dadosEvento = await response.json();
                setLocalEvento(dadosEvento.local);
            } else {
                console.error('Falha ao obter dados do evento');
            }
        } catch (error) {
            console.error('Erro ao obter dados do evento:', error);
        }
    };

    useEffect(() => {
        if (compromisso.tipo === 'tarefa') {
            obterTarefa();
        } else {
            obterEvento();
        }
    }, [compromisso.tipo, compromisso.id]);

    function editarProgramacao(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        console.log('Tipo:', compromisso.tipo);

        const newData = {
            hora,
            data,
            titulo,
            local
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
                    compromisso.titulo = titulo;
                    compromisso.local = local;
                    
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

    function concluirTarefa() {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/tarefas/${compromisso.id}/concluir`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Marcar a tarefa como concluída
                //setIsConcluida(true);
                console.log('Tarefa concluída com sucesso');
            } else {
                console.error('Falha ao concluir a tarefa');
            }
        })
        .catch(error => {
            console.error('Erro ao concluir a tarefa:', error);
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
                <a> {data} {' | '} {hora} {' | '} {titulo}</a>
                <div className='botoesCompromisso'>
                    {compromisso.tipo === 'tarefa' && (
                        <button id="botaoConcluido" onClick={concluirTarefa}> &#10004; </button>
                    )}
                    <button id="botaoEditar" onClick={handleEditClick}> &#9998; </button>
                </div>
            </div>

            {showEditor && (
                <div id="editor" className="dropEditor">
                    <form onSubmit={editarProgramacao}>
                        <div>
                            <label> Descrição: </label>
                            <textarea value={titulo} onChange={e => setTitulo(e.target.value)} />
                        </div>
                        {compromisso.tipo === 'evento' && (
                            <div>
                                <label> Local: </label>
                                <textarea value={local} onChange={e => setLocalEvento(e.target.value)} />
                                
                            </div>
                        )} 
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
