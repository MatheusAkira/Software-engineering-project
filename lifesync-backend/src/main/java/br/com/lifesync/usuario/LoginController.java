package br.com.lifesync.usuario;

import br.com.lifesync.usuario.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//Controlador REST responsável por manipular requisições relacionadas ao login
@RestController
public class LoginController {

    //Injeção de dependência do gerenciador de autenticação
    @Autowired
    private AuthenticationManager manager;

    //Injeção de dependência do serviço de tokens
    @Autowired
    private TokenService tokenService;

    //Injeção de dependência do serviço de usuários
    @Autowired
    private UsuarioService service;

    //Endpoint para efetuar o login de um usuário
    @PostMapping("login")
    public ResponseEntity<String> efetuarLogin(@RequestBody @Valid LoginDTO dto) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        return ResponseEntity.ok(tokenJWT);
    }

    //Endpoint para registrar um novo usuário
    @PostMapping("signin")
    public ResponseEntity<Void> register(@RequestBody @Valid CadastroUsuarioDTO dados){
        if(service.loadUserByUsername(dados.email()) != null) return ResponseEntity.badRequest().build();

        String senhaCriptografada = new BCryptPasswordEncoder().encode(dados.senha());

        Usuario usuario = new Usuario(dados.nome(), dados.email(), senhaCriptografada, Role.USUARIO);

        service.salvarUsuario(usuario);

        return ResponseEntity.ok().build();
    }
}

