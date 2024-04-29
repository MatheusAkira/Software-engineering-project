import React, { useState, useEffect } from 'react';
import './Programacao.css';
import Compromisso from './Compromisso';

function Programacao() {
    const [compromissos, setCompromissos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8080/compromissos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Falha ao obter compromissos.');
                }
            })
            .then(data => {
                setCompromissos(data);
            })
            .catch(error => {
                console.error('Erro ao obter compromissos:', error);
            });
        }
    }, []);

    return(
        <div className="blocoProgramacao">
            {compromissos.map(compromisso => (
                <Compromisso key={compromisso.id} compromisso={compromisso} />
            ))}
        </div>
    );
}

export default Programacao;