import React, { useState } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import './SingUp.css';

function SingUp(){

    //Variaveis do formulário de cadastro
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function validarUsuario(e){
        console.log('Usuario validado');
        e.preventDefault();

        console.log('Nome: ' + nome);
        console.log('Email: ' + email);
        console.log('Senha: ' + senha);

        //redirecionar para a página home
        window.location.href = '/singin';
    }

    return (
        <div className="signup-container">
            <div class="logo">
                <div>
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                </div>
            </div>
            <div class="singupBox">
                <h1> Cadastro </h1>
                <form onSubmit={validarUsuario}>
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
                        <button type="submit" href="/singin"> Cadastrar </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default SingUp;