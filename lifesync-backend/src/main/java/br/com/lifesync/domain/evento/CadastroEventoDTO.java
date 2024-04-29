package br.com.lifesync.domain.evento;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;

//Representa um objeto de transferência de dados para o cadastro de um evento
public record CadastroEventoDTO( 
    @NotBlank(message = "O título é obrigatório")
    String titulo,
    @NotBlank(message = "A data é obrigatória")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "A data deve estar no formato yyyy-MM-dd")
    String data,
    @NotBlank(message = "A hora é obrigatória")
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "A hora deve estar no formato HH:mm")
    String hora,
    @NotBlank(message = "O local é obrigatório")
    String local) {
}
