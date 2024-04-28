package br.com.lifesync.evento;

public record ListagemEventoDTO(Long id, String titulo, String data, String hora) {

    public ListagemEventoDTO(Evento evento) {
        this(evento.getId(), evento.getTitulo(), evento.getData().toString(), evento.getHora().toString());
    }
}
