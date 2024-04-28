package br.com.lifesync.evento;
import br.com.lifesync.usuario.UsuarioService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public void adicionarEvento(CadastroEventoDTO dto) {
        Evento evento = new Evento(dto);
        evento.setUsuario(usuarioService.obterUsuarioLogado());
        eventoRepository.save(evento);
    }

    public Optional<Evento> obterEvento(Long id) {
        return eventoRepository.findById(id);
    }

    @Transactional
    public void editarEvento(Long id, CadastroEventoDTO dto) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isPresent()) {
            Evento evento = optionalEvento.get();
            evento.atualizarInformacoes(dto);
            eventoRepository.save(evento);
        }
    }

    @Transactional
    public void excluirEvento(Long id) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isPresent()) {
            Evento evento = optionalEvento.get();
            evento.desativar();
        }
    }

    @Transactional
    public void marcarEventoComoConcluido(Long id) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isPresent()) {
            Evento evento = optionalEvento.get();
            evento.concluir();
        }
    }
}
