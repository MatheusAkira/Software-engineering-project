package br.com.lifesync.evento;
import br.com.lifesync.usuario.UsuarioService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

// Classe de serviço responsável pela lógica de negócios relacionada aos eventos
@Service
public class EventoService {

    // Injeção de dependência do repositório de eventos
    @Autowired
    private EventoRepository eventoRepository;

    // Injeção de dependência do serviço de usuários
    @Autowired
    private UsuarioService usuarioService;

    // Método para adicionar um novo evento com base nos dados recebidos no DTO
    @Transactional
    public void adicionarEvento(CadastroEventoDTO dto) {
        Evento evento = new Evento(dto);
        evento.setUsuario(usuarioService.obterUsuarioLogado());
        eventoRepository.save(evento);
    }

    // Método para obter um evento pelo seu ID
    public Optional<Evento> obterEvento(Long id) {
        return eventoRepository.findById(id);
    }

    // Método para editar um evento existente pelo seu ID
    @Transactional
    public void editarEvento(Long id, EdicaoEventoDTO dto) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isPresent()) {
            Evento evento = optionalEvento.get();
            evento.atualizarInformacoes(dto);
            eventoRepository.save(evento);
        }
    }

    // Método para excluir um evento pelo seu ID
    @Transactional
    public void excluirEvento(Long id) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isPresent()) {
            Evento evento = optionalEvento.get();
            evento.desativar();
        }
    }
}
