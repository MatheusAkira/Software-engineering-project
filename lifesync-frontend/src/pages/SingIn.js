import React, { useState } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import './SingIn.css';

function SingIn(){

    //Variáveis do formulario de login
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function validarUsuario(e){
        console.log('Usuario validado');
        e.preventDefault();
        
        console.log('Email: ' + email);
        console.log('Senha: ' + senha);
        
        //redirecionar para a página home
        window.location.href = '/home';
    }

    return (
        <div className="signin-container">
            <div class="logo">
                <div>
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                </div>
                <div>
                    <a>LifeSync</a>
                </div>
            </div>
            <div class="singinBox">
                <h1> Entrar </h1>
                <form onSubmit={validarUsuario}>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Entrar</button>
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