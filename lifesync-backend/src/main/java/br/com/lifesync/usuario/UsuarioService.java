package br.com.lifesync.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// Classe de serviço responsável pela lógica de negócios relacionada aos usuários
@Service
public class UsuarioService implements UserDetailsService {

    // Injeção de dependência do repositório de usuários
    @Autowired
    private UsuarioRepository repository;

    //Método para carregar um usuário pelo seu email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.repository.findByEmail(email);
    }

    //Método para salvar um usuário
    public void salvarUsuario(Usuario usuario){
        this.repository.save(usuario);
    }

    //Método para obter o usuário logado
    public Usuario obterUsuarioLogado() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return (Usuario) this.loadUserByUsername(username);
    }
}