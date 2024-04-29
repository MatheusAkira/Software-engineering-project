package br.com.lifesync.evento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Optional;

// Controlador REST responsável por manipular requisições relacionadas aos eventos
@RestController
@RequestMapping("eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // Endpoint para adicionar um novo evento
    @PostMapping
    public ResponseEntity<Void> adicionarEvento(@RequestBody @Valid CadastroEventoDTO dto) {
        eventoService.adicionarEvento(dto);
        return ResponseEntity.created(URI.create("/eventos")).build();
    }

    // Endpoint para obter os detalhes de um evento pelo seu ID
    @GetMapping("/{id}")
    public ResponseEntity<Evento> obterEvento(@PathVariable Long id) {
        Optional<Evento> optionalEvento = eventoService.obterEvento(id);
        return optionalEvento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para editar um evento existente pelo seu ID
    @PutMapping("/{id}")
    public ResponseEntity<Void> editarEvento(@PathVariable Long id, @RequestBody @Valid EdicaoEventoDTO dto) {
        eventoService.editarEvento(id, dto);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para excluir um evento existente pelo seu ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        eventoService.excluirEvento(id);
        return ResponseEntity.noContent().build();
    }
}
