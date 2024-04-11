import React, { useState } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import './SingUp.css';

function SingUp(){

    //Variaveis do formulário de cadastro
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function validarUsuario(e){
        e.preventDefault();

        // Criar objeto com os dados do formulário
        const formData = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Enviar os dados para o backend via POST usando Fetch API
        fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
            return response.text(); // Retorna o texto da resposta
        })
        .then(data => {
            if (data) {
                const jsonData = JSON.parse(data); // Faz o parse apenas se houver dados
                console.log('Usuário cadastrado com sucesso:', jsonData);
            } else {
                console.log('Usuário cadastrado com sucesso, sem dados adicionais.');
            }
            // redirecionar para a página home
            window.location.href = '/singin';
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
        });
    }

    return (
        <div className="signup-container">
            <div className="logo">
                <div>
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                </div>
            </div>
            <div className="singupBox">
                <h1> Cadastro </h1>
                <form>
                    <div>
                        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div>
                        <button type="button" onClick={validarUsuario}> Cadastrar </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SingUp;
