package br.com.lifesync.domain.evento;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lifesync.domain.usuario.Usuario;

import java.util.List;

//Repositório para interagir com banco de dados de eventos
public interface EventoRepository extends JpaRepository <Evento, Long>{
    List<Evento> findByUsuarioAndAtivoTrue(Usuario usuario);
}