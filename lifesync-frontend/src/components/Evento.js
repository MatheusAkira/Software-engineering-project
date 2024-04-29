import React, { useState, useEffect } from 'react';
import './Evento.css';

function Evento() {
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
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

    function cadastrarEvento(e) {
        e.preventDefault();
        
        // Validação dos campos
        if (!titulo.trim()) {
            setErrorMessage('Por favor, preencha a descrição do evento.');
            return;
        }
        if (!local.trim()) {
            setErrorMessage('Por favor, preencha o local do evento.');
            return;
        }
        if (!data.trim()) {
            setErrorMessage('Por favor, preencha a data do evento.');
            return;
        }
        if (!hora.trim()) {
            setErrorMessage('Por favor, preencha a hora do evento.');
            return;
        }
        
        const formData = {
            titulo: titulo,
            data: data,
            hora: hora,
            local: local
            // Adicione outros campos conforme necessário
        };

        // Enviar dados para a API
        fetch('http://localhost:8080/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Evento cadastrado com sucesso!');
                // Adicione qualquer lógica adicional após o cadastro bem-sucedido

                // Forçar a atualização da página
                window.location.reload();
            } else {
                console.error('Falha ao cadastrar evento.');
                setErrorMessage('Houve um erro ao cadastrar o evento. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar evento:', error);
            setErrorMessage('Houve um erro ao cadastrar o evento. Por favor, tente novamente.');
        });
    }

    return (
        <div className="blocoEvento">
            <form onSubmit={cadastrarEvento}>
                <a> CADASTRAR NOVO EVENTO </a>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div>
                    <label> Descrição: </label>
                    <textarea type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>
                <div>
                    <label> Local: </label>
                    <input type="text" value={local} onChange={e => setLocal(e.target.value)} />
                </div>
                <div>
                    <label> Data: </label>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} />
                    <label> Hora: </label>
                    <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}

export default Evento;
