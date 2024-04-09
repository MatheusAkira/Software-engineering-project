package br.com.lifesync.tarefa;
import br.com.lifesync.usuario.UsuarioService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public void adicionarTarefa(CadastroTarefaDTO dto) {
        Tarefa tarefa = new Tarefa(dto);
        tarefa.setUsuario(usuarioService.obterUsuarioLogado());
        tarefaRepository.save(tarefa);
    }

    public Optional<Tarefa> obterTarefa(Long id) {
        return tarefaRepository.findById(id);
    }

    @Transactional
    public void editarTarefa(Long id, CadastroTarefaDTO dto) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.atualizarInformacoes(dto);
            tarefaRepository.save(tarefa);
        }
    }

    @Transactional
    public void excluirTarefa(Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.desativar();
        }
    }

    @Transactional
    public void marcarTarefaComoConcluida(Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.concluir();
        }
    }
}