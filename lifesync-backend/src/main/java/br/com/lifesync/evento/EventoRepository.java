package br.com.lifesync.evento;

import br.com.lifesync.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//Repositório para interagir com banco de dados de eventos
public interface EventoRepository extends JpaRepository <Evento, Long>{
    List<Evento> findByUsuarioAndAtivoTrue(Usuario usuario);
}