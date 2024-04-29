package br.com.lifesync.domain.evento;

//Representa um objeto de transferência de dados para a listagem de eventos
public record ListagemEventoDTO(Long id, String titulo, String data, String hora) {

    public ListagemEventoDTO(Evento evento) {
        this(evento.getId(), evento.getTitulo(), evento.getData().toString(), evento.getHora().toString());
    }
}
