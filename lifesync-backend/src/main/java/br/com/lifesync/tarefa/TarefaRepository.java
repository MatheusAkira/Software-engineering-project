package br.com.lifesync.tarefa;

import br.com.lifesync.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefaRepository extends JpaRepository <Tarefa, Long>{
    List<Tarefa> findByUsuarioAndAtivaTrue(Usuario usuario);
}
