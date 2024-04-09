package br.com.lifesync.tarefa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<Void> adicionarTarefa(@Valid @RequestBody CadastroTarefaDTO dto) {
        tarefaService.adicionarTarefa(dto);
        return ResponseEntity.created(URI.create("/tarefas")).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> obterTarefa(@PathVariable Long id) {
        Optional<Tarefa> optionalTarefa = tarefaService.obterTarefa(id);
        return optionalTarefa.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editarTarefa(@PathVariable Long id, @Valid @RequestBody CadastroTarefaDTO dto) {
        tarefaService.editarTarefa(id, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        tarefaService.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> marcarTarefaComoConcluida(@PathVariable Long id) {
        tarefaService.marcarTarefaComoConcluida(id);
        return ResponseEntity.noContent().build();
    }
}