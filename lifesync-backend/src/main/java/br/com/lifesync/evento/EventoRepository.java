package br.com.lifesync.evento;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository <Evento, Long>{
}