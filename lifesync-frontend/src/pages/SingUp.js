import logoLifeSync from '../logoLifeSync.png';
import './SingUp.css';

function SingUp(){

    function validarUsuario(e){
        console.log('Usuario validado');
        e.preventDefault();
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
                        <input type="text" placeholder="Nome" />
                    </div>
                    <div>
                        <input type="text" placeholder="Nome de Usuário" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" />
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