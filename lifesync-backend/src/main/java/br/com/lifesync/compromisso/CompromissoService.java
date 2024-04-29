package br.com.lifesync.compromisso;

import br.com.lifesync.evento.EventoRepository;
import br.com.lifesync.tarefa.Tarefa;
import br.com.lifesync.tarefa.TarefaRepository;
import br.com.lifesync.usuario.Usuario;
import br.com.lifesync.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CompromissoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<CompromissoDTO> listarCompromissosOrdenados() {
        List<Compromisso> compromissos = buscarCompromissosDoUsuarioLogado();
        List<Compromisso> compromissosOrdenados = ordenarCompromissosPorDataEHora(compromissos);
        return converterParaDTO(compromissosOrdenados);
    }

    private List<Compromisso> buscarCompromissosDoUsuarioLogado() {
        Usuario usuario = usuarioService.obterUsuarioLogado();
        List<Compromisso> compromissos = new ArrayList<>();
        compromissos.addAll(tarefaRepository.findByUsuarioAndAtivaTrue(usuario));
        compromissos.addAll(eventoRepository.findByUsuarioAndAtivoTrue(usuario));
        return compromissos;
    }

    private List<Compromisso> ordenarCompromissosPorDataEHora(List<Compromisso> compromissos) {
        return compromissos.stream()
                .sorted(Comparator.comparing(Compromisso::getData)
                        .thenComparing(Compromisso::getHora))
                .toList();
    }

    private List<CompromissoDTO> converterParaDTO(List<Compromisso> compromissos) {
        List<CompromissoDTO> compromissosDTO = new ArrayList<>();
        for (Compromisso c : compromissos) {
            compromissosDTO.add(converterParaDTO(c));
        }
        return compromissosDTO;
    }

    private CompromissoDTO converterParaDTO(Compromisso compromisso) {
        String tipo = (compromisso instanceof Tarefa) ? "tarefa" : "evento";
        return new CompromissoDTO(compromisso.getId(), compromisso.getTitulo(),
                compromisso.getData().toString(), compromisso.getHora().toString(), tipo);
    }
}