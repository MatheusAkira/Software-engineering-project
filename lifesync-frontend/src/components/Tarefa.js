import React, { useState, useEffect } from 'react';
import './Tarefa.css';

function Tarefa() {
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Obter token de autenticação do localStorage
        const storedToken = localStorage.getItem('token');
        console.log('Token obtido:', storedToken); // Verifica se o token foi corretamente obtido
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    function cadastrarTarefa(e) {
        e.preventDefault();
        
        // Validação dos campos
        if (!titulo.trim()) {
            setErrorMessage('Por favor, preencha a descrição da tarefa.');
            return;
        }
        if (!data.trim()) {
            setErrorMessage('Por favor, preencha a data da tarefa.');
            return;
        }
        if (!hora.trim()) {
            setErrorMessage('Por favor, preencha a hora da tarefa.');
            return;
        }
        
        const formData = {
            titulo: titulo,
            data: data,
            hora: hora
            // Adicione outros campos conforme necessário
        };

        // Enviar dados para a API
        fetch('http://localhost:8080/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Tarefa cadastrada com sucesso!');
                // Adicione qualquer lógica adicional após o cadastro bem-sucedido
                
                // Forçar a atualização da página
                window.location.reload();
            } else {
                console.error('Falha ao cadastrar tarefa.');
                setErrorMessage('Houve um erro ao cadastrar a tarefa. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar tarefa:', error);
            setErrorMessage('Houve um erro ao cadastrar a tarefa. Por favor, tente novamente.');
        });
    }

    return (
        <div className="blocoTarefa">
            <form onSubmit={cadastrarTarefa}>
                <a> CADASTRAR NOVA TAREFA </a>
                <div>
                    <label> Descrição: </label>
                    <textarea type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>
                <div>
                    <label> Data: </label>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} />
                    <label> Hora: </label>
                    <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
                </div>
                <input type="submit" value="Cadastrar" />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Tarefa;
