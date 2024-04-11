package br.com.lifesync.compromisso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompromissoController {

    @Autowired
    private CompromissoService compromissoService;

    @GetMapping("compromissos")
    public ResponseEntity listarCompromissos() {
        List<CompromissoDTO> compromissosDTO = compromissoService.listarCompromissosOrdenados();
        return ResponseEntity.ok(compromissosDTO);
    }
}