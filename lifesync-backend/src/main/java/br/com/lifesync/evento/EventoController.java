package br.com.lifesync.evento;

import br.com.lifesync.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("eventos")
public class EventoController {
    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public void adicionarEvento(@RequestBody EventoDTO dto) {
        var evento = new Evento(dto);
        var usuario = usuarioService.obterUsuarioLogado();
        evento.setUsuario(usuario);
        eventoRepository.save(evento);
    }
}


