package br.com.lifesync.tarefa;

import br.com.lifesync.usuario.UsuarioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

// Classe de serviço responsável pela lógica de negócios relacionada às tarefas
@Service
public class TarefaService {

    // Injeção de dependência do repositório de tarefas
    @Autowired
    private TarefaRepository tarefaRepository;

    // Injeção de dependência do serviço de usuários
    @Autowired
    private UsuarioService usuarioService;

    // Método para adicionar uma nova tarefa com base nos dados recebidos no DTO
    @Transactional
    public void adicionarTarefa(CadastroTarefaDTO dto) {
        Tarefa tarefa = new Tarefa(dto);
        tarefa.setUsuario(usuarioService.obterUsuarioLogado());
        tarefaRepository.save(tarefa);
    }

    // Método para obter uma tarefa pelo seu ID
    public Optional<Tarefa> obterTarefa(Long id) {
        return tarefaRepository.findById(id);
    }

    // Método para editar uma tarefa existente pelo seu ID
    @Transactional
    public void editarTarefa(Long id, @Valid EdicaoTarefaDTO dto) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.atualizarInformacoes(dto);
            tarefaRepository.save(tarefa);
        }
    }

    // Método para excluir uma tarefa pelo seu ID
    @Transactional
    public void excluirTarefa(Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.desativar();
        }
    }

    // Método para marcar uma tarefa como concluída pelo seu ID
    @Transactional
    public void marcarTarefaComoConcluida(Long id) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            tarefa.concluir();
        }
    }
}