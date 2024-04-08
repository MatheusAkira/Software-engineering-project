package br.com.lifesync.tarefa;

import br.com.lifesync.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tarefas")
public class TarefaController {
    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public void adicionarTarefa(@RequestBody TarefaDTO dto) {
        var tarefa = new Tarefa(dto);
        var usuario = usuarioService.obterUsuarioLogado();
        tarefa.setUsuario(usuario);
        tarefaRepository.save(tarefa);
    }
}