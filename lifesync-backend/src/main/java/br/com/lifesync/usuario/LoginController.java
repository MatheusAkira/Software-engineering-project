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


@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService service;

    @PostMapping("login")
    public ResponseEntity<String> efetuarLogin(@RequestBody @Valid LoginDTO dto) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        return ResponseEntity.ok(tokenJWT);
    }

    @PostMapping("signin")
    public ResponseEntity register(@RequestBody CadastroUsuarioDTO dados){
        if(service.loadUserByUsername(dados.email()) != null) return ResponseEntity.badRequest().build();

        String senhaCriptografada = new BCryptPasswordEncoder().encode(dados.senha());

        Usuario usuario = new Usuario(dados.nome(), dados.email(), senhaCriptografada, Role.USUARIO);

        service.salvarUsuario(usuario);

        return ResponseEntity.ok().build();
    }
}

