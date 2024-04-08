import logoLifeSync from '../logoLifeSync.png';
import './SingIn.css';

function SingIn(){

    function validarUsuario(e){
        console.log('Usuario validado');
        e.preventDefault();
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
                <form onSubmit={validarUsuario}>
                    <div>
                        <input type="email" placeholder="Nome de Usuário ou Email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" />
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