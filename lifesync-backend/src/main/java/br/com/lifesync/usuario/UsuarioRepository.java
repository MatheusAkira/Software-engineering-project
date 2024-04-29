package br.com.lifesync.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

//Repositório para interagir com banco de dados de usuários
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
