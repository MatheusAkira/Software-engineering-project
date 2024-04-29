package br.com.lifesync.tarefa;

//Representa um objeto de transferência de dados para a listagem de uma tarefa
public record ListagemTarefaDTO(Long id, String titulo, String data, String hora) {

    //Construtor que recebe uma tarefa e extrai os dados necessários    
    public ListagemTarefaDTO(Tarefa tarefa) {
        this(tarefa.getId(), tarefa.getTitulo(), tarefa.getData().toString(), tarefa.getHora().toString());
    }
}
