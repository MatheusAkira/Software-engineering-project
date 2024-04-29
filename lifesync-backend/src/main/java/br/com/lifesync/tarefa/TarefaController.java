package br.com.lifesync.tarefa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Optional;

// Controlador REST responsável por manipular requisições relacionadas às tarefas
@RestController
@RequestMapping("tarefas")
public class TarefaController {

    // Injeção de dependência do serviço de tarefas
    @Autowired
    private TarefaService tarefaService;

    // Endpoint para adicionar uma nova tarefa
    @PostMapping
    public ResponseEntity<Void> adicionarTarefa(@Valid @RequestBody CadastroTarefaDTO dto) {
        tarefaService.adicionarTarefa(dto);
        return ResponseEntity.created(URI.create("/tarefas")).build();
    }

    // Endpoint para obter os detalhes de uma tarefa pelo seu ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> obterTarefa(@PathVariable Long id) {
        Optional<Tarefa> optionalTarefa = tarefaService.obterTarefa(id);
        return optionalTarefa.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para editar uma tarefa existente pelo seu ID
    @PutMapping("/{id}")
    public ResponseEntity<Void> editarTarefa(@PathVariable Long id, @Valid @RequestBody EdicaoTarefaDTO dto) {
        tarefaService.editarTarefa(id, dto);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para excluir uma tarefa existente pelo seu ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        tarefaService.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para marcar uma tarefa como concluída pelo seu ID
    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> marcarTarefaComoConcluida(@PathVariable Long id) {
        tarefaService.marcarTarefaComoConcluida(id);
        return ResponseEntity.noContent().build();
    }
}
