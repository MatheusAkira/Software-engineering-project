package br.com.lifesync.tarefa;

public record ListagemTarefaDTO(Long id, String titulo, String data, String hora) {

    public ListagemTarefaDTO(Tarefa tarefa) {
        this(tarefa.getId(), tarefa.getTitulo(), tarefa.getData().toString(), tarefa.getHora().toString());
    }
}
