package br.com.lifesync.evento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("eventos")
public class EventoController {
    @Autowired
    private EventoRepository eventoRepository;

    @PostMapping
    public void adicionarEvento(EventoDTO dto) {
        var evento = new Evento(dto);
        eventoRepository.save(evento);

    }


}


