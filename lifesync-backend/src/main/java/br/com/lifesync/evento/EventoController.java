package br.com.lifesync.evento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @PostMapping
    public ResponseEntity<Void> adicionarEvento(@Valid @RequestBody CadastroEventoDTO dto) {
        eventoService.adicionarEvento(dto);
        return ResponseEntity.created(URI.create("/eventos")).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obterEvento(@PathVariable Long id) {
        Optional<Evento> optionalEvento = eventoService.obterEvento(id);
        return optionalEvento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editarEvento(@PathVariable Long id, @Valid @RequestBody CadastroEventoDTO dto) {
        eventoService.editarEvento(id, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        eventoService.excluirEvento(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> marcarEventoComoConcluido(@PathVariable Long id) {
        eventoService.marcarEventoComoConcluido(id);
        return ResponseEntity.noContent().build();
    }
}
