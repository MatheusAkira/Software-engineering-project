package br.com.lifesync.domain.evento;

//Representa um objeto de transferência de dados para a edição de um evento
public record EdicaoEventoDTO(String titulo, String data, String hora, String local) {
}
