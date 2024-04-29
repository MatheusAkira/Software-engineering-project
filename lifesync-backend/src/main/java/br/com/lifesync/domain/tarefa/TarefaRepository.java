package br.com.lifesync.domain.tarefa;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lifesync.domain.usuario.Usuario;

import java.util.List;
//Repositório para interagir com banco de dados de tarefas
public interface TarefaRepository extends JpaRepository <Tarefa, Long>{
    List<Tarefa> findByUsuarioAndAtivaTrue(Usuario usuario);
}
