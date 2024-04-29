package br.com.lifesync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lifesync.domain.compromisso.CompromissoDTO;
import br.com.lifesync.domain.compromisso.CompromissoService;

import java.util.List;

@RestController
public class CompromissoController {

    @Autowired
    private CompromissoService compromissoService;

    @GetMapping("compromissos")
    public ResponseEntity<List<CompromissoDTO>>  listarCompromissos() {
        List<CompromissoDTO> compromissosDTO = compromissoService.listarCompromissosOrdenados();
        return ResponseEntity.ok(compromissosDTO);
    }
}