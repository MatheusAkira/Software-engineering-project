import React, { useEffect } from 'react';
import logoLifeSync from '../logoLifeSync.png';
import fotoPerfil from '../fotoPerfil.png';

function Perfil() {
    return (
        <div class="container">
            <div id="header" class="header">
                <div class="headerLogo">
                    <img src={logoLifeSync} className="App-logoLifeSync" alt="logoLifeSync" />
                    <a>LifeSync</a>
                </div>

                <div class="dropdown">
                    <img src={fotoPerfil} class="dropbtn" alt="fotoPerfil" />
                    <div class="dropdown-content">
                        <a href="/home">Home</a>
                        <a href="/perfil">Perfil</a>
                        <a href="/singIn">Sair</a>
                    </div>
                </div>
            </div>
            {/* Criar uma dive com a imagem do usuário, nome, email, senha e botão de editar */}
            <div class="userProfile">
            </div>

        </div>
    );
}

export default Perfil;