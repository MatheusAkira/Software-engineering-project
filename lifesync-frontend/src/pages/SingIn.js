import React, { useState } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import './SingIn.css';

function SingIn(){

    // Variáveis do formulário de login
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function validarUsuario(e){
        e.preventDefault();
    
        // Verificar se o email e senha têm pelo menos 8 caracteres
        if (senha.length < 8) {
            alert("Senha devem ter pelo menos 8 caracteres.");
            return; // Aborta a função se a senha for menor que 8 caracteres
        }
    
        // Criar objeto com os dados do formulário
        const formData = {
            email: email,
            senha: senha
        };
    
        // Enviar os dados para o backend via POST usando Fetch API
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao efetuar login');
            }
            return response.text(); // Retorna o texto da resposta
        })
        .then(data => {
            // Armazenar o token recebido na resposta no localStorage
            localStorage.setItem('token', data); 
            console.log('Login efetuado com sucesso. Token recebido:', data);
            // redirecionar para a página home
            window.location.href = '/home';
        })
        .catch(error => {
            console.error('Erro ao efetuar login:', error);
            alert("Email ou senha incorretos.");
        });
    }
    

    return (
        <div className="signin-container">
            <div className="logo">
                <div className="logo-container">
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                    <a>LifeSync</a>
                </div>
            </div>
            <div className="singinBox">
                <h1> Entrar </h1>
                <form onSubmit={validarUsuario}>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div>
                        <button class="hoverButton" type="submit">Entrar</button>
                    </div>
                    <div>
                        Não tem uma conta? <a href="/singup">Cadastre-se</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SingIn;
