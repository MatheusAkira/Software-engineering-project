package br.com.lifesync.tarefa;

import br.com.lifesync.usuario.UsuarioService;
import jakarta.transaction.Transactional;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tarefas")
public class TarefaController {
    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    @Transactional
    public ResponseEntity adicionarTarefa(@RequestBody CadastroTarefaDTO dto) {
        var tarefa = new Tarefa(dto);
        var usuario = usuarioService.obterUsuarioLogado();
        tarefa.setUsuario(usuario);
        tarefaRepository.save(tarefa);
        var uri = URI.create("/tarefas/" + tarefa.getId());
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity obterTarefa(@PathVariable Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            var tarefa = optionalTarefa.get();
            return ResponseEntity.ok(tarefa);
        } 
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity editarTarefa(@PathVariable Long id, @RequestBody CadastroTarefaDTO dto) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            var tarefa = optionalTarefa.get();
            tarefa.atualizarInformacoes(dto);
            tarefaRepository.save(tarefa);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirTarefa(@PathVariable Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            var tarefa = optionalTarefa.get();
            tarefa.desativar();
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/concluir")
    @Transactional
    public ResponseEntity marcarTarefaComoConcluida(@PathVariable Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            var tarefa = optionalTarefa.get();
            tarefa.concluir();
            return ResponseEntity.noContent().build();
        } 
        return ResponseEntity.notFound().build();
    }
}